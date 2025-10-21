var Webflow = Webflow || []
Webflow.push(function () {
	function cloneRecentSlides() {
		$('.swiper-wrapper[nest=true]').empty();
		
		var allItems = $('.cms-nest_slot .swiper-slide[nest="true"]');
		
		if (allItems.length === 0) {
			allItems = $('.swiper-slide[nest="true"]');
		}
		
		if (allItems.length === 0) {
			allItems = $('[nest="true"]');
		}
    
		var swiperWrapper = $('.swiper-wrapper[nest=true]');
		
		if (allItems.length > 0 && swiperWrapper.length > 0) {
			allItems.each(function() {
				swiperWrapper.append($(this).clone());
			});
			
			if (typeof Swiper !== 'undefined') {
				$('.swiper-wrapper[nest=true]').each(function() {
					if ($(this).data('swiper')) {
						$(this).data('swiper').destroy(true, true);
					}
				});
				
				setTimeout(function() {
					new Swiper('.swiper-wrapper[nest=true]', {
						slidesPerView: 1,
						spaceBetween: 30,
						loop: false,
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
						},
					});
				}, 100);
			}
		}
	}
	
	$(document).ready(function() {
		setTimeout(cloneRecentSlides, 500);
	});
  
  $(window).on('resize', function () {
    setTimeout(cloneRecentSlides, 100)
  })
});
