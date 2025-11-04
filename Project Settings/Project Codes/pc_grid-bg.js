window.Webflow ||= [];
window.Webflow.push(() => {
  // --- DYNAMIC GRID BACKGROUND ---
  const initDynamicGrid = () => {
    const gridContainer = document.querySelector('.grid-bg');
    if (!gridContainer) {
      console.warn('Grid background container not found.');
      return;
    }

    // Debounce function to limit how often a function gets called.
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const createGrid = () => {
      // Use requestAnimationFrame to ensure calculations happen on the next paint cycle
      requestAnimationFrame(() => {
        const squareSize = 32;
        const containerWidth = gridContainer.offsetWidth;
        const containerHeight = gridContainer.offsetHeight;

        const columns = Math.floor(containerWidth / squareSize);
        const rows = Math.floor(containerHeight / squareSize);
        const totalSquares = columns * rows;

        // Use a DocumentFragment for performance
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < totalSquares; i++) {
          const square = document.createElement('div');
          square.className = 'grid-bg_square';
          fragment.appendChild(square);
        }

        // Clear existing grid and append the new one in a single operation
        gridContainer.innerHTML = '';
        gridContainer.appendChild(fragment);
      });
    };

    const debouncedCreateGrid = debounce(createGrid, 250);

    createGrid();
    window.addEventListener('resize', debouncedCreateGrid);
    window.addEventListener('orientationchange', debouncedCreateGrid);
  };

  initDynamicGrid();
});
