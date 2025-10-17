window.Webflow ||= [];
window.Webflow.push(() => {
  const LINE_PROCESS_SELECTOR = '.line-process';
  const TRIGGER_SECTION_SELECTOR = '.section_process';
  
  const ANIMATION_CONFIG = {
    lineDuration: 3,
    lineOpacity: 0.5,
    ease: 'power1.out',
    trigger: {
      start: 'top 40%', 
      end: 'bottom 20%',
      scrub: 3
    }
  };

  /**
   * Checks if required GSAP plugins are available
   */
  function checkGSAPPlugins() {
    if (typeof gsap === 'undefined' || 
        typeof DrawSVGPlugin === 'undefined' || 
        typeof ScrollTrigger === 'undefined') {
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
   * Checks if device is desktop (1280px or more)
   */
  function isDesktop() {
    return window.innerWidth >= 1280;
  }

  /**
   * Initializes the process line scroll animation
   */
  function initProcessScrollAnimation() {
    // Only run on desktop
    if (!isDesktop()) {
      return;
    }

    // Check if plugins are loaded
    if (!checkGSAPPlugins()) {
      return;
    }

    const lineProcessContainer = document.querySelector(LINE_PROCESS_SELECTOR);
    const triggerSection = document.querySelector(TRIGGER_SECTION_SELECTOR);
    
    if (!lineProcessContainer || !triggerSection) {
      return;
    }

    // Find the actual SVG element inside the container
    const svgElement = lineProcessContainer.querySelector('svg');
    if (!svgElement) {
      return;
    }

    // Find the drawable path/line inside the SVG
    const drawablePath = svgElement.querySelector('path');
    if (!drawablePath) {
      return;
    }

    // Fix SVG attributes
    fixSVGAttributes(svgElement);

    // Set initial states
    gsap.set(drawablePath, {
      opacity: ANIMATION_CONFIG.lineOpacity,
      drawSVG: '0% 0%'
    });

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSection,
        start: ANIMATION_CONFIG.trigger.start,
        end: ANIMATION_CONFIG.trigger.end,
        scrub: ANIMATION_CONFIG.trigger.scrub,
        markers: false // Set to true for debugging
      }
    });

    // Animate the line drawing based on scroll
    tl.to(drawablePath, {
      drawSVG: '0% 100%',
      duration: ANIMATION_CONFIG.lineDuration,
      ease: ANIMATION_CONFIG.ease
    });
  }

  /**
   * Handles window resize to reinitialize on breakpoint change
   */
  function handleResize() {
    // Kill all ScrollTriggers related to this animation
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === document.querySelector(TRIGGER_SECTION_SELECTOR)) {
        trigger.kill();
      }
    });
    
    // Reinitialize
    initProcessScrollAnimation();
  }

  // Initialize animation when DOM is ready
  initProcessScrollAnimation();

  // Reinitialize on resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  });
});

