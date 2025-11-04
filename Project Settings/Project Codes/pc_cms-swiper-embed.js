window.Webflow ||= [];
window.Webflow.push(() => {
  // --- CMS SWIPER INITIALIZATION ---
  const initCmsSwiper = () => {
    const swiperComponents = document.querySelectorAll('.swiper[nest-init="true"]');
    if (!swiperComponents.length) return;

    // Debounce function to limit how often a function gets called.
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    };

    swiperComponents.forEach((component) => {
      const sourceList = component.querySelector('.cms-swiper_list');
      const swiperWrapper = component.querySelector('.swiper-wrapper');
      
      if (!sourceList || !swiperWrapper) {
        console.warn('Swiper source list or wrapper not found in a component.');
        return;
      }

      const allItems = sourceList.querySelectorAll('.swiper-slide');
      if (!allItems.length) return;

      // Use a DocumentFragment for performant DOM manipulation.
      const fragment = document.createDocumentFragment();
      allItems.forEach(item => fragment.appendChild(item.cloneNode(true)));
      
      // Clear the source list (optional) and populate the swiper wrapper.
      sourceList.innerHTML = ''; 
      swiperWrapper.innerHTML = '';
      swiperWrapper.appendChild(fragment);

      // Initialize Swiper
      const swiperInstance = new Swiper(component, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        navigation: {
          nextEl: component.querySelector('.swiper-button-next'),
          prevEl: component.querySelector('.swiper-button-prev'),
        },
        pagination: {
          el: component.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });

      // Update Swiper on resize instead of destroying it.
      const onResize = () => swiperInstance.update();
      window.addEventListener('resize', debounce(onResize, 250));
    });
  };

  initCmsSwiper();
});
