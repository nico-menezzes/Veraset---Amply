window.Webflow ||= [];
window.Webflow.push(() => {
  // --- PRODUCTS TAB CONTENT ANIMATION ---
  const initProductsTabAnimation = () => {
    const config = {
      tabComponentSelector: '[data-tabs="products-component"]',
      tabPaneSelector: '[data-tab]',
      activeClass: 'w--tab-active',
      animElement1: '[data="animate-tab-1"]',
      animElement2: '[data="animate-tab-2"]',
    };

    const tabComponents = document.querySelectorAll(config.tabComponentSelector);
    if (!tabComponents.length) return;

    tabComponents.forEach(component => {
      // Reusable animation function.
      const animatePaneContent = (activePane) => {
        if (!activePane) return;
        
        const animElement1 = activePane.querySelector(config.animElement1);
        const animElement2 = activePane.querySelector(config.animElement2);
        
        // Use a single timeline for better control.
        const tl = gsap.timeline();
        
        if (animElement1) {
          tl.fromTo(animElement1, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
        }
        
        if (animElement2) {
          tl.fromTo(animElement2, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3' // Overlap for a smoother effect.
          );
        }
      };

      // Function to find the active pane and trigger its animation.
      const handleTabChange = () => {
        const activePane = component.querySelector(`${config.tabPaneSelector}.${config.activeClass}`);
        animatePaneContent(activePane);
      };

      // Initial animation for the pre-selected tab on page load.
      handleTabChange();
      
      // Use event delegation for clicks.
      component.addEventListener('click', (e) => {
        // We only care about clicks inside the tab menu to detect a change.
        if (!e.target.closest('.w-tab-menu')) return;

        // A small delay ensures we run this after Webflow's tab logic has completed.
        setTimeout(handleTabChange, 0);
      });
    });
  };

  initProductsTabAnimation();
});
