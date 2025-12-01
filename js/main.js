function mobileCheck(){
	var winWidth=$(window).width();
	if (winWidth<=768) {
		$("#sidebar").after($("#body .pagination:first"))
	} else {
		$(".products-wrap").before($("#body .pagination:first"))
	}
}

$(document).ready(function() {
	$("input[type=checkbox]").crfi();
	$("select").crfs();
	// Slider başlangıcı artık dinamik veri yüklendikten sonra (loadSliders) yapılacak.
	// Burada otomatik kurulum kaldırıldı; tekrar init inline script içerisinde çağrılır.
	
	// Add click functionality to slider items
	// Slide click: inline script yeniden init ettiğinde li elementleri yenileniyor; delegation kullan.
	$(document).on('click', '#slider li', function(){
		var link = $(this).find('a.btn-more').attr('href');
		window.location.href = link || 'product.html';
	});
	// Son eklenen ürünler slider'ı artık dinamik yükleme sonrası başlatılacak
	$(".tabs .nav a").click(function() {
		var container = $(this).parentsUntil(".tabs").parent();
		if (!$(this).parent().hasClass("active")) {
			container.find(".nav .active").removeClass("active")
			$(this).parent().addClass("active")
			container.find(".tab-content").hide()
			$($(this).attr("href")).show();
		};
		return false;
	});
	$("#price-range").slider({
		range: true,
		min: 0,
		max: 5000,
		values: [ 500, 3500 ],
		slide: function( event, ui ) {
			$(".ui-slider-handle:first").html("<span>$" + ui.values[ 0 ] + "</span>");
			$(".ui-slider-handle:last").html("<span>$" + ui.values[ 1 ] + "</span>");
		}
	});
	$(".ui-slider-handle:first").html("<span>$" + $( "#price-range" ).slider( "values", 0 ) + "</span>");
	$(".ui-slider-handle:last").html("<span>$" + $( "#price-range" ).slider( "values", 1 ) + "</span>");
	$("#menu .trigger").click(function() {
		$(this).toggleClass("active").next().toggleClass("active")
	});

	// Modal functionality for announcements
	$(".announcement-item, .announcement-full").click(function() {
		var title = $(this).find("h3, h2").first().text();
		var content = $(this).data("content");
		$("#modal-title").text(title);
		$("#modal-content").html(content);
		$("#announcement-modal").fadeIn();
	});
	
	$(".modal-close, .modal-overlay").click(function() {
		$("#announcement-modal, #success-modal").fadeOut();
	});
	
	// Dropdown menu functionality
	$(".menu-item.has-submenu").hover(
		function() {
			$(this).find(".submenu").slideDown(200);
		},
		function() {
			$(this).find(".submenu").slideUp(200);
		}
	);

	mobileCheck();
	$(window).resize(function() {
		mobileCheck();
	});
});