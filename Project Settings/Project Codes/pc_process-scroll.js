window.Webflow ||= [];
window.Webflow.push(() => {
  // --- PROCESS SECTION SCROLL-DRAW ANIMATION ---
  const initProcessScrollAnimation = () => {
    const config = {
      selectors: {
        triggerSection: '[data-anim="process-section"]',
        svgContainer: '.line-process',
        drawablePath: '[data-anim="process-line"]',
      },
      animation: {
        lineOpacity: 0.5,
        ease: 'none',
        scrub: 3,
      },
      desktopMinWidth: 1280,
    };

    const triggerSection = document.querySelector(config.selectors.triggerSection);
    const svgContainer = document.querySelector(config.selectors.svgContainer);
    if (!triggerSection || !svgContainer) return;
    
    // Check for required GSAP plugins
    if (typeof DrawSVGPlugin === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP plugins DrawSVGPlugin or ScrollTrigger are not loaded.');
      return;
    }

    const drawablePath = svgContainer.querySelector(config.selectors.drawablePath);
    const svgElement = svgContainer.querySelector('svg');
    if (!drawablePath || !svgElement) return;

    // Helper to fix potential SVG attribute issues
    const fixSvgAttributes = (svg) => {
      if (svg.getAttribute('height') === 'auto') svg.removeAttribute('height');
      if (svg.getAttribute('width') === 'auto') svg.removeAttribute('width');
    };
    fixSvgAttributes(svgElement);

    // Use ScrollTrigger.matchMedia() for responsive animations.
    // This is the modern, recommended way to handle viewport-dependent animations.
    ScrollTrigger.matchMedia({
      // Setup animations for desktop viewports
      [`(min-width: ${config.desktopMinWidth}px)`]: () => {
        gsap.set(drawablePath, {
          opacity: config.animation.lineOpacity,
          drawSVG: '0% 0%',
        });

        gsap.to(drawablePath, {
          drawSVG: '0% 100%',
          ease: config.animation.ease,
          scrollTrigger: {
            trigger: triggerSection,
            start: 'top 40%',
            end: 'bottom 20%',
            scrub: config.animation.scrub,
          },
        });
        
        // No return needed here for cleanup; matchMedia handles it automatically.
      },
    });
  };

  initProcessScrollAnimation();
});

