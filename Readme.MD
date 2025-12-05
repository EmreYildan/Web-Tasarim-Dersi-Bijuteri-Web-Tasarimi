# 💎 Bijuteri Web Sitesi Tasarımı – Proje Raporu
**Emre Yasin Yıldan – Kocaeli Üniversitesi / Bilişim Sistemleri Mühendisliği**

---

## 🔗 Proje Bağlantıları
- **Proje Klasörü:**  
  https://drive.google.com/drive/folders/16LnYA_QpFZDsFLA3CWgDpYtl1DWNeWNu  
- **GitHub Deposu:**  
  https://github.com/EmreYildan/Web-Tasarim-Dersi-Bijuteri-Web-Tasarimi

---

# 📝 Özet
Bu projede bijuteri sektörüne uygun, modern ve responsive bir web sitesi tasarlanmıştır. Hazır bir HTML/CSS/JS şablonu temel alınarak özelleştirilmiş ve kullanıcı deneyimini artırmaya yönelik çeşitli grafiksel, yapısal ve fonksiyonel geliştirmeler yapılmıştır.

---

# 🧭 Proje Akışı

```mermaid
flowchart TD
    A[Proje Konusu Belirlendi<br>Bijuteri Sektörü] --> B[Ön Araştırma Yapıldı]
    B --> C[Hazır Şablon Seçimi]
    C --> D[Şablonun Özelleştirilmesi]
    D --> E[Sitelerin Kodlanması]
    E --> F[Admin Paneli Mantığının Eklenmesi]
    F --> G[Chart Sayfası ve İstatistikler]
    G --> H[UX Geliştirmeleri ve Ek Yenilikler]
    H --> I[Son Testler ve Yayınlama]

#🎯 Proje Amacı

Hazır bir responsive şablonun, modern web tasarım ilkelerine uygun şekilde özelleştirilerek profesyonel bir kurumsal site yapısına dönüştürülmesi hedeflenmiştir.

#🔍 Proje Konusu ve Ön Araştırma

-Sektör: Bijuteri / Mücevherat Satış Sitesi

-Rakip analizleri yapılarak:

-Renk paletleri

-Slider yerleşimleri

-Ürün sunum biçimleri

-Menü yapıları

-Kullanıcı akışı incelenmiştir.

mindmap
  root((Site))
    Html
      about.html
      announcements.html
      Ürünler
      İstatistikler
    Ürünler
      Yüzükler
      Bileklikler
      Kolye Modelleri
    Birimler
      Tasarım Ekibi
      Üretim Ekibi
      Satış & Destek
    Hakkımızda
      Misyon
      Vizyon
    İletişim
      Harita
      Form
    Admin Paneli
      Duyuru Yönetimi
      Ürün Yönetimi
      Sayfa Düzenleme

#  Proje İsterleri Tamamlanan Eksiksiz

- [x] Üst kısımda menü çubuğu yer almalıdır.
- [x] Ürün/Hizmet Tanıtımı: En az üç adet tanıtımı yapılacak ürün veya hizmet için otomatik
değişen bir slider bulunmalıdır. Sliderlar, belirli aralıklarla otomatik ilerlemeli ve
tıklanabilir olmalıdır.     
- [x] Slider’daki öğelere tıklandığında, ilgili ürünün detay sayfasına yönlendirilmelidir. Detay
sayfasında ürün özellikleri, açıklaması, ücreti ve görselleri yer almalıdır.
- [x] Duyurular/Fırsatlar/Kampanyalar Alanı: En az beş adet duyuru listelenmelidir.
    - Her duyuru tıklandığında, ayrıntıları bir açılır pencerede (modal) gösterilmelidir.
    - Duyuru eklenirken başlık, içerik, PDF, Word belgesi ve resim gibi farklı dosya
tiplerinin eklenebilmesi mantığına sahip olmalıdır (Bu, admin panelinde
tasarlanacak bir yapı olarak düşünülmelidir).
    - “Daha Fazla” butonu ile tüm duyuruların listelendiği ayrı bir sayfaya erişim
sağlanmalıdır. Bu sayfada duyurular en yeniden en eskiye doğru sıralanmalıdır.
- [x] Menü Yapısı:
    - Ana sayfadaki menü, sitenin tüm sayfalarına erişim sağlamalıdır.
    - Alt Menüler: “Ürünlerimiz” ve “Birimlerimiz” gibi ana menü başlıkları altında en az 2-
3 adet alt menü bulunmalıdır. Alt menülerden ilgili sayfalara tek tıklamayla ulaşılmalıdır.
    - Tek Tıklama Sayfaları: “Hakkımızda”, “Misyon-Vizyon” ve “İletişim” gibi sayfalar
doğrudan tek tıklamayla açılmalıdır.
- [x] Sayfa İçerikleri:
    - Hakkımızda, Misyon-Vizyon, Ürünlerimiz, Birimlerimiz, İletişim: Bu sayfaların
içerikleri, seçtiğiniz sektöre uygun şekilde, anlaşılır ve ilgi çekici bir dille doldurulmalıdır.
    - İletişim Sayfası:
    - Google Harita Entegrasyonu: Firmanın konumu, Google Haritalar üzerinde
işaretlenmiş şekilde gösterilmelidir.
    - Şikayet ve Öneri Formu: Başlık ve içerik alanları olan bir form tasarlanmalıdır.
Bu formun gönderilmesi durumunda, bilgilerin bir müşteri ilişkileri temsilcisine eposta ile gönderileceği mantığı tasarlanmalıdır (Sunucu kodu yazılmayacak, ancak
formun bu işlevi yerine getireceği bir tasarım yapılacaktır). Kullanıcının yazdığı eposta müşteri ilişkileri temsilcisine gönderilecektir.   

- [x] Header ve Footer:
    - Header: Menü çubuğunu içeren üst kısım (header), sitenin tüm sayfalarında aynı şekilde
bulunmalıdır.
    - Footer: Firmanın açık adresi, telefon numarası, sosyal medya adresleri, web sitesi
tasarımcısının bilgileri ve kısa bir tanıtım gibi temel bilgileri içermelidir. Footer, sitenin
tüm sayfalarının en altında tutarlı bir şekilde yer almalıdır.
- [x] Teknik ve Sunum Gereksinimleri:
    - Canlı Sunum: Tasarladığınız web sitesi, bir web sunucusunda canlı olarak çalışır halde
sunulmalıdır.
    - Proje Raporu: Projenizi anlatan detaylı bir Rapor hazırlanmalı ve projeyle birlikte
sunulmalıdır. Rapor, şablon seçimi, özelleştirme süreci, karşılaşılan zorluklar ve çözümler
gibi konuları kapsamalıdır.
