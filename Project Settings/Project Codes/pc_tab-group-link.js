window.Webflow ||= [];
window.Webflow.push(() => {
  // --- TAB GROUP COMBO CLASS SYNC ---
  const initTabGroupClassSync = () => {
    const config = {
      tabComponentSelector: '[data-tabs="component"]', // Parent component
      tabLinkSelector: '.tab-group_link', // Clickable tab links
      tabContentSelector: '.tab-group_link-content', // Content to apply the class to
      activeClass: 'w--current',
      comboClassPrefix: 'cc-', // Prefix for combo classes to sync
    };

    const tabComponents = document.querySelectorAll(config.tabComponentSelector);
    if (!tabComponents.length) return;

    tabComponents.forEach(component => {
      const tabLinks = component.querySelectorAll(config.tabLinkSelector);
      if (!tabLinks.length) return;

      const updateContentClass = () => {
        let activeTab = null;
        
        // First, find the currently active tab.
        tabLinks.forEach(link => {
          if (link.classList.contains(config.activeClass)) {
            activeTab = link;
          }
        });

        // Find the corresponding content pane for the active tab.
        const activeContent = activeTab ? activeTab.querySelector(config.tabContentSelector) : null;
        if (!activeContent) return;

        // Find the combo class on the active tab link.
        let comboClass = '';
        for (const cls of activeTab.classList) {
          if (cls.startsWith(config.comboClassPrefix)) {
            comboClass = cls;
            break;
          }
        }

        // Clean up classes on all content panes.
        tabLinks.forEach(link => {
          const content = link.querySelector(config.tabContentSelector);
          if (content) {
            for (const cls of content.classList) {
              if (cls.startsWith(config.comboClassPrefix)) {
                content.classList.remove(cls);
              }
            }
          }
        });
        
        // Apply the found combo class to the active content pane.
        if (comboClass) {
          activeContent.classList.add(comboClass);
        }
      };

      // Set initial state on page load.
      updateContentClass();

      // Use event delegation to handle clicks efficiently.
      component.addEventListener('click', (e) => {
        if (!e.target.closest(config.tabLinkSelector)) return;
        
        // A small delay ensures we run this after Webflow's tab logic.
        setTimeout(updateContentClass, 0);
      });
    });
  };

  initTabGroupClassSync();
});
