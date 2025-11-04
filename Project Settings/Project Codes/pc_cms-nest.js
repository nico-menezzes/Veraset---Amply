window.Webflow ||= [];
window.Webflow.push(() => {
  // --- CMS NEST: RANDOM ITEM ---
  const initCmsNestRandom = () => {
    const nestComponents = document.querySelectorAll('.cms-nest');
    if (!nestComponents.length) return;

    nestComponents.forEach((component) => {
      const sourceList = component.querySelector('[nest="source"]');
      const targetList = component.querySelector('[nest="target"]');
      
      if (!sourceList || !targetList) {
        console.warn('CMS Nest source or target list not found in a component.');
        return;
      }

      const allItems = Array.from(sourceList.querySelectorAll('[nest="item"]'));
      if (!allItems.length) return;

      // Fisher-Yates Shuffle algorithm for a truly random and performant shuffle.
      for (let i = allItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
      }
      
      const randomItem = allItems[0];
      if (randomItem) {
        targetList.innerHTML = '';
        targetList.appendChild(randomItem.cloneNode(true));
      }
    });
  };

  initCmsNestRandom();
});
