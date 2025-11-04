window.Webflow ||= [];
window.Webflow.push(() => {
  // --- HERO ENTRANCE ANIMATION ORCHESTRATOR ---
  const initHeroOrchestration = () => {
    // Configuration object for selectors and animation parameters.
    const config = {
      selectors: {
        container: '[data-anim="hero-orchestrator"]',
        line: '[data-anim="hero-line"]',
        squares: '[data-anim="hero-square"]',
      },
      animation: {
        delay: 1,
        lineDuration: 2,
        squaresDuration: 0.6,
        squaresStagger: 0.15,
        ease: 'power2.inOut',
      },
      desktopMinWidth: 1024,
    };

    const container = document.querySelector(config.selectors.container);
    if (!container) return;

    // Only run on desktop devices.
    if (window.innerWidth < config.desktopMinWidth) return;

    // Check for required GSAP plugins.
    if (typeof DrawSVGPlugin === 'undefined') {
      console.warn('DrawSVGPlugin is not loaded. Skipping hero orchestration.');
      return;
    }

    const line = container.querySelector(config.selectors.line);
    const squares = gsap.utils.toArray(config.selectors.squares, container);
    const svgElement = container.querySelector('svg');

    if (!line || !squares.length || !svgElement) {
      console.warn('Required elements for hero orchestration not found.');
      return;
    }

    // A helper to fix potential SVG attribute issues for GSAP.
    const fixSvgAttributes = (svg) => {
      if (svg.getAttribute('height') === 'auto') svg.removeAttribute('height');
      if (svg.getAttribute('width') === 'auto') svg.removeAttribute('width');
      if (!svg.hasAttribute('viewBox') && svg.getBBox) {
        try {
          const bbox = svg.getBBox();
          svg.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
        } catch (e) {
          console.warn('Could not set viewBox on hero SVG.', e);
        }
      }
    };

    fixSvgAttributes(svgElement);

    // Set initial states.
    gsap.set(line, { autoAlpha: 1, drawSVG: '0% 0%' });
    gsap.set(squares, { autoAlpha: 0 });

    // Create and run the animation timeline.
    const tl = gsap.timeline({ delay: config.animation.delay });

    tl.to(line, {
      drawSVG: '0% 100%',
      duration: config.animation.lineDuration,
      ease: config.animation.ease,
    }).to(squares, {
      autoAlpha: 1,
      duration: config.animation.squaresDuration,
      ease: 'power2.out',
      stagger: config.animation.squaresStagger,
    }, '-=0.3'); // Overlap slightly with the line animation for a smoother effect.
  };

  initHeroOrchestration();
});
