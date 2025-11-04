window.Webflow ||= [];
window.Webflow.push(() => {
  // --- GRID BACKGROUND HOVER EFFECT ---
  const initGridHoverEffect = () => {
    const gridContainer = document.querySelector('.grid-bg');
    if (!gridContainer) return;

    const desktopMediaQuery = window.matchMedia('(min-width: 769px)');
    let isActive = false;

    const colors = [
      'var(--_color-palette---medium-purple)',
      'var(--_color-palette---ebfc79)',
      'var(--_color-palette---ed793b)',
      'var(--_color-palette---86a5b8)',
      'var(--_color-palette---bee7f3)',
      'var(--_color-palette---ecbda3)',
    ];
    const originalColor = 'rgba(189, 189, 180, 0.2)';

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    // Event handler for mouseover
    const handleMouseOver = (e) => {
      if (!e.target.classList.contains('grid-bg_square')) return;
      
      gsap.to(e.target, {
        backgroundColor: getRandomColor(),
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Event handler for mouseout
    const handleMouseOut = (e) => {
      if (!e.target.classList.contains('grid-bg_square')) return;

      gsap.to(e.target, {
        backgroundColor: originalColor,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const activateEffects = () => {
      if (isActive) return;
      gridContainer.addEventListener('mouseover', handleMouseOver);
      gridContainer.addEventListener('mouseout', handleMouseOut);
      isActive = true;
    };

    const deactivateEffects = () => {
      if (!isActive) return;
      gridContainer.removeEventListener('mouseover', handleMouseOver);
      gridContainer.removeEventListener('mouseout', handleMouseOut);
      isActive = false;
    };
    
    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        activateEffects();
      } else {
        deactivateEffects();
      }
    };

    // Initial check
    if (desktopMediaQuery.matches) {
      activateEffects();
    }
    
    // Listen for changes
    desktopMediaQuery.addEventListener('change', handleMediaQueryChange);
  };

  initGridHoverEffect();
});

