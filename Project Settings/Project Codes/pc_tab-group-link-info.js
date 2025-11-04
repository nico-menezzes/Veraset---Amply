window.Webflow ||= [];
window.Webflow.push(() => {
  // --- CUSTOM TAB GROUP INFO DISPLAY ---
  const initTabGroupInfo = () => {
    const config = {
      tabComponentSelector: '[data-tabs="component"]',
      tabLinkSelector: '[data-tab-link]',
      infoPanelSelector: '[data-tab-info]',
      activeClass: 'w--current',
    };

    const tabComponents = document.querySelectorAll(config.tabComponentSelector);
    if (!tabComponents.length) return;

    tabComponents.forEach(component => {
      const tabLinks = component.querySelectorAll(config.tabLinkSelector);
      const infoPanels = component.querySelectorAll(config.infoPanelSelector);

      if (!tabLinks.length || !infoPanels.length) {
        console.warn('Tab links or info panels not found in a component.');
        return;
      }

      // Hides all panels and shows the one corresponding to the active tab.
      const updatePanels = () => {
        let activePanel = null;

        tabLinks.forEach(link => {
          const tabName = link.getAttribute('data-tab-link');
          const correspondingPanel = component.querySelector(`[data-tab-info="${tabName}"]`);
          
          if (link.classList.contains(config.activeClass) && correspondingPanel) {
            activePanel = correspondingPanel;
          } else if (correspondingPanel) {
            gsap.set(correspondingPanel, { display: 'none', opacity: 0 });
          }
        });

        if (activePanel) {
          gsap.to(activePanel, {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      };

      // Set initial state on page load.
      updatePanels();

      // Use event delegation on the component to handle clicks.
      component.addEventListener('click', (e) => {
        // Check if a tab link or its child was clicked.
        const clickedTab = e.target.closest(config.tabLinkSelector);
        if (!clickedTab) return;
        
        // Let Webflow's tab logic run, then update our panels.
        // A small delay ensures we're reacting after Webflow adds the .w--current class.
        setTimeout(updatePanels, 0);
      });
    });
  };

  initTabGroupInfo();
});
