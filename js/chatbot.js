/* ============================================
   CHATBOT WIDGET - AI Müşteri Asistanı
   localStorage tabanlı akıllı sohbet sistemi
   ============================================ */

(function() {
    'use strict';

    // Chatbot yapılandırması
    const CONFIG = {
        botName: 'Emre Asistan',
        botAvatar: '🤖',
        userAvatar: '👤',
        typingDelay: 1000,
        welcomeMessage: 'Merhaba! Ben Emre Mücevherat asistanıyım. Size nasıl yardımcı olabilirim? 😊'
    };

    // Mesaj geçmişini localStorage'da sakla
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    let isOpen = false;
    let isTyping = false;

    // Otomatik yanıt veritabanı
    const RESPONSES = {
        // Selamlaşma
        greetings: {
            keywords: ['merhaba', 'selam', 'günaydın', 'iyi günler', 'hey', 'hi', 'hello'],
            responses: [
                'Merhaba! Size nasıl yardımcı olabilirim? 😊',
                'Hoş geldiniz! Ürünlerimiz hakkında bilgi mi almak istersiniz?',
                'Merhaba! Bugün size nasıl yardımcı olabilirim?'
            ]
        },
        
        // Ürün soruları
        products: {
            keywords: ['ürün', 'kolye', 'küpe', 'yüzük', 'bilezik', 'takı', 'mücevherat', 'altın', 'gümüş', 'elmas'],
            responses: [
                'Geniş ürün yelpazemizi görmek için <a href="products.html">Ürünlerimiz</a> sayfasını ziyaret edebilirsiniz. Kolye, küpe, yüzük ve daha fazlası! 💎',
                'Harika seçimler! Size <a href="new-collection.html">Yeni Koleksiyonumuzu</a> önerebilirim. Muhteşem tasarımlar! ✨'
            ]
        },
        
        // Fiyat soruları
        price: {
            keywords: ['fiyat', 'kaç para', 'ne kadar', 'ücret', 'tutar', 'maliyet'],
            responses: [
                'Fiyatlarımız 1.500 TL - 15.000 TL arasında değişmektedir. Detaylı fiyat bilgisi için ürün sayfalarımızı ziyaret edebilirsiniz. 💰',
                'Tüm ürünlerimizde şu an %20\'ye varan indirim kampanyası var! Hemen göz atın! 🎉'
            ]
        },
        
        // Kargo soruları
        shipping: {
            keywords: ['kargo', 'teslimat', 'gönderi', 'nakliye', 'ne zaman', 'kaç gün'],
            responses: [
                'Kargo tamamen ücretsiz! 🚚 Siparişiniz 1-3 iş günü içinde kapınızda. Hızlı teslimat garantisi veriyoruz!',
                'Aynı gün kargo! Saat 14:00\'e kadar verilen siparişler aynı gün kargoya teslim edilir. 📦'
            ]
        },
        
        // Ödeme soruları
        payment: {
            keywords: ['ödeme', 'kredi kartı', 'taksit', 'havale', 'eft', 'kapıda ödeme'],
            responses: [
                'Kredi kartı, banka kartı ve havale/EFT ile ödeme alıyoruz. 12 taksit imkanı mevcut! 💳',
                'Güvenli ödeme garantisi! 3D Secure ile %100 güvenli alışveriş. 🔒'
            ]
        },
        
        // İade soruları
        return: {
            keywords: ['iade', 'değişim', 'geri gönder', 'beğenmedim', 'uygun değil'],
            responses: [
                '14 gün içinde koşulsuz iade hakkınız var! Üstelik kargo bedava. 📮',
                'Değişim de yapabilirsiniz. Size en uygun çözümü buluruz. 🔄'
            ]
        },
        
        // Sertifika soruları
        certificate: {
            keywords: ['sertifika', 'garanti', 'belgeli', 'orijinal', 'gerçek'],
            responses: [
                'Tüm ürünlerimiz %100 orijinal ve sertifikalı! GIA ve IGI sertifikaları mevcut. 🏅',
                'Her ürün ile birlikte garanti belgesi ve ayar/karat belgesi gönderilir. ✅'
            ]
        },
        
        // İletişim soruları
        contact: {
            keywords: ['telefon', 'ara', 'mail', 'email', 'adres', 'nerede', 'iletişim'],
            responses: [
                '📞 Telefon: (0262) 123 45 67<br>📧 Email: info@emremucevherat.com<br>Hafta içi 09:00-18:00 arası hizmetinizdeyiz!',
                '<a href="contact.html">İletişim sayfamızdan</a> bize ulaşabilirsiniz. Ayrıca canlı destek hattımız 7/24 aktif! 💬'
            ]
        },
        
        // Teşekkür
        thanks: {
            keywords: ['teşekkür', 'teşekkürler', 'sağol', 'eyvallah', 'çok sağol'],
            responses: [
                'Rica ederim! Başka bir konuda yardımcı olabilir miyim? 😊',
                'Ne demek! Yardımcı olabildiysem ne mutlu bana! ✨'
            ]
        },
        
        // Veda
        goodbye: {
            keywords: ['görüşürüz', 'hoşçakal', 'bay', 'güle güle', 'iyi günler'],
            responses: [
                'Hoşçakalın! Tekrar görüşmek üzere! 👋',
                'İyi günler! Alışverişiniz için teşekkürler! 🌟'
            ]
        }
    };

    // Hızlı yanıt önerileri
    const QUICK_REPLIES = [
        '🛍️ Ürünleri Göster',
        '📦 Kargo Bilgisi',
        '💳 Ödeme Seçenekleri',
        '📞 İletişim'
    ];

    // Chatbot HTML'ini oluştur
    function createChatbot() {
        const chatbotHTML = `
            <div class="chatbot-widget">
                <button class="chatbot-button" id="chatbot-toggle" aria-label="Sohbet asistanı">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    <span class="chatbot-badge" id="chatbot-badge" style="display: none;">1</span>
                </button>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-left">
                            <div class="chatbot-avatar">${CONFIG.botAvatar}</div>
                            <div class="chatbot-info">
                                <h3>${CONFIG.botName}</h3>
                                <div class="chatbot-status">
                                    <span class="status-dot"></span>
                                    Çevrimiçi
                                </div>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close" aria-label="Kapat">×</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages"></div>
                    
                    <div class="chatbot-input-area">
                        <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Mesajınızı yazın..." />
                        <button class="chatbot-send" id="chatbot-send" aria-label="Gönder">
                            <svg viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        initializeEventListeners();
        loadChatHistory();
        
        // İlk açılışta hoş geldin mesajı
        if (chatHistory.length === 0) {
            setTimeout(() => addBotMessage(CONFIG.welcomeMessage, QUICK_REPLIES), 500);
        }
    }

    // Event listener'ları başlat
    function initializeEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggleBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Chat penceresini aç/kapat
    function toggleChat() {
        isOpen = !isOpen;
        const window = document.getElementById('chatbot-window');
        const badge = document.getElementById('chatbot-badge');
        
        if (isOpen) {
            window.classList.add('active');
            document.getElementById('chatbot-input').focus();
            badge.style.display = 'none';
        } else {
            window.classList.remove('active');
        }
    }

    // Mesaj gönder
    function sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message || isTyping) return;
        
        addUserMessage(message);
        input.value = '';
        
        // Bot yanıtını hazırla
        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateResponse(message);
                addBotMessage(response);
            }, CONFIG.typingDelay);
        }, 300);
    }

    // Kullanıcı mesajı ekle
    function addUserMessage(text) {
        const message = {
            type: 'user',
            text: text,
            time: new Date().toISOString()
        };
        
        chatHistory.push(message);
        saveChatHistory();
        renderMessage(message);
    }

    // Bot mesajı ekle
    function addBotMessage(text, quickReplies = null) {
        const message = {
            type: 'bot',
            text: text,
            quickReplies: quickReplies,
            time: new Date().toISOString()
        };
        
        chatHistory.push(message);
        saveChatHistory();
        renderMessage(message);
    }

    // Mesajı render et
    function renderMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const time = new Date(message.time).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="chatbot-message message-${message.type}">
                <div class="message-avatar">${message.type === 'bot' ? CONFIG.botAvatar : CONFIG.userAvatar}</div>
                <div class="message-content">
                    <div class="message-bubble">${message.text}</div>
                    <div class="message-time">${time}</div>
                    ${message.quickReplies ? renderQuickReplies(message.quickReplies) : ''}
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Hızlı yanıt butonlarına event listener ekle
        if (message.quickReplies) {
            attachQuickReplyListeners();
        }
    }

    // Hızlı yanıtları render et
    function renderQuickReplies(replies) {
        return `
            <div class="quick-replies">
                ${replies.map(reply => `<button class="quick-reply-btn" data-reply="${reply}">${reply}</button>`).join('')}
            </div>
        `;
    }

    // Hızlı yanıt butonlarına listener ekle
    function attachQuickReplyListeners() {
        const buttons = document.querySelectorAll('.quick-reply-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const reply = this.dataset.reply;
                document.getElementById('chatbot-input').value = reply;
                sendMessage();
            });
        });
    }

    // Yazıyor göstergesi
    function showTypingIndicator() {
        isTyping = true;
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chatbot-typing" id="typing-indicator">
                <div class="message-avatar">${CONFIG.botAvatar}</div>
                <div class="message-bubble">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTypingIndicator() {
        isTyping = false;
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    // Akıllı yanıt üret
    function generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Hangi kategoriye uyuyor bul
        for (const [category, data] of Object.entries(RESPONSES)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];
                return randomResponse;
            }
        }
        
        // Eşleşme yoksa genel yanıt
        const defaultResponses = [
            'İlginç bir soru! Daha detaylı bilgi için <a href="contact.html">iletişime</a> geçebilirsiniz. 📞',
            'Bu konuda size yardımcı olmak isterim! Müşteri hizmetlerimizle görüşmek ister misiniz? 🤝',
            'Anlıyorum. <a href="sıkçasorulansorular.html">SSS sayfamızda</a> cevabını bulabilirsiniz! 📚',
            'Harika bir soru! Size en iyi şekilde yardımcı olmak için müşteri temsilcimizle görüşebilirsiniz. 💬'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Chat geçmişini yükle
    function loadChatHistory() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = '';
        
        chatHistory.forEach(message => {
            renderMessage(message);
        });
    }

    // Chat geçmişini kaydet
    function saveChatHistory() {
        // Son 50 mesajı tut
        if (chatHistory.length > 50) {
            chatHistory = chatHistory.slice(-50);
        }
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // Sayfa yüklendiğinde chatbot'u başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createChatbot);
    } else {
        createChatbot();
    }

    // Global fonksiyonları dışa aktar (admin panel için)
    window.ChatbotAPI = {
        clearHistory: function() {
            chatHistory = [];
            localStorage.removeItem('chatHistory');
            loadChatHistory();
        },
        getHistory: function() {
            return chatHistory;
        },
        addCustomResponse: function(keywords, responses) {
            const customKey = 'custom_' + Date.now();
            RESPONSES[customKey] = { keywords, responses };
        }
    };

})();
