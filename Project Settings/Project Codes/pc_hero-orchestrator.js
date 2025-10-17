window.Webflow ||= [];
window.Webflow.push(() => {
  const HERO_LINE_SELECTOR = '.hero-orchestrator_line';
  const ANIMATION_CONFIG = {
    delay: 1,
    lineDuration: 2,
    squaresDuration: 0.6,
    squaresStagger: 0.15,
    ease: 'power2.inOut'
  };

  /**
   * Checks if DrawSVG plugin is available
   */
  function checkDrawSVGPlugin() {
    if (typeof gsap === 'undefined' || typeof DrawSVGPlugin === 'undefined') {
      return false;
    }
    return true;
  }

  /**
   * Fixes SVG attributes to ensure proper rendering
   */
  function fixSVGAttributes(svgElement) {
    // Remove invalid 'auto' values
    if (svgElement.getAttribute('height') === 'auto') {
      svgElement.removeAttribute('height');
    }
    if (svgElement.getAttribute('width') === 'auto') {
      svgElement.removeAttribute('width');
    }
    
    // Ensure viewBox is present for proper scaling
    if (!svgElement.hasAttribute('viewBox') && svgElement.getBBox) {
      try {
        const bbox = svgElement.getBBox();
        svgElement.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
      } catch (e) {
        // Silent fail
      }
    }
  }

  /**
   * Checks if device is desktop
   */
  function isDesktop() {
    return window.innerWidth >= 1024;
  }

  /**
   * Initializes the hero orchestrator line animation
   */
  function initHeroAnimation() {
    // Only run on desktop
    if (!isDesktop()) {
      return;
    }

    // Check if plugins are loaded
    if (!checkDrawSVGPlugin()) {
      return;
    }

    const heroLineContainer = document.querySelector(HERO_LINE_SELECTOR);
    if (!heroLineContainer) {
      return;
    }

    // Find the actual SVG element inside the container
    const svgElement = heroLineContainer.querySelector('svg');
    if (!svgElement) {
      return;
    }

    // Find the drawable path/line inside the SVG
    const drawableElement = svgElement.querySelector('path[stroke-dasharray]');
    if (!drawableElement) {
      return;
    }

    // Find all squares (rects) for fade in animation
    const squares = svgElement.querySelectorAll('rect[fill="#ED793B"]');
    
    // Fix SVG attributes
    fixSVGAttributes(svgElement);

    // Set initial states
    gsap.set(drawableElement, {
      autoAlpha: 1,
      drawSVG: '0% 0%'
    });

    // Set squares initial state (hidden)
    gsap.set(squares, {
      autoAlpha: 0
    });

    // Create timeline for coordinated animation
    const tl = gsap.timeline({
      delay: ANIMATION_CONFIG.delay
    });

    // Animate the line drawing
    tl.to(drawableElement, {
      drawSVG: '0% 100%',
      duration: ANIMATION_CONFIG.lineDuration,
      ease: ANIMATION_CONFIG.ease
    });

    // Animate squares fade in with stagger after line completes
    tl.to(squares, {
      autoAlpha: 1,
      duration: ANIMATION_CONFIG.squaresDuration,
      ease: 'power2.out',
      stagger: ANIMATION_CONFIG.squaresStagger
    }, '-=0.3'); // Start slightly before line completes
  }

  // Initialize animation when DOM is ready
  initHeroAnimation();
});
