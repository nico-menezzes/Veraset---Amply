window.Webflow ||= [];
window.Webflow.push(() => {
  // --- HERO COORDINATES INTRO ANIMATION ---
  const initIntroAnimation = () => {
    const config = {
      containerSelector: '[data-anim="intro-container"]',
      coordinateSelector: '.hero_single-coordinate',
      svgPathSelector: '.coordinate_embed svg path',
      countTriggerSelector: '[count-trigger]',
      countNumberSelector: '[count-number]',
      overallDelay: 3.25,
      staggerDelay: 0.5, // Time between each coordinate animation starts
    };

    const container = document.querySelector(config.containerSelector);
    if (!container) return;
    
    // Check for required GSAP plugins
    if (typeof DrawSVGPlugin === 'undefined') {
      console.warn('DrawSVGPlugin is not loaded. Skipping intro animation.');
      return;
    }

    const coordinates = gsap.utils.toArray(config.coordinateSelector, container);
    if (!coordinates.length) return;

    const masterTimeline = gsap.timeline({ delay: config.overallDelay });

    coordinates.forEach((coordinate) => {
      const svgPath = coordinate.querySelector(config.svgPathSelector);
      const countNumbers = coordinate.querySelectorAll(config.countNumberSelector);

      // Create a dedicated timeline for each coordinate
      const coordinateTl = gsap.timeline();

      coordinateTl
        .from(coordinate, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.out',
        })
        .from(svgPath, {
          drawSVG: '0%',
          duration: 0.4,
          ease: 'power2.out',
        });

      // Animate numbers
      countNumbers.forEach((numberEl) => {
        const decimals = parseInt(numberEl.getAttribute('count-decimals')) || 0;
        const targetNumber = parseFloat(numberEl.textContent.replace(/,/g, ''));
        
        // Animate a value in an object for better performance
        let counter = { value: 0 };

        coordinateTl.to(counter, {
          value: targetNumber,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: () => {
            numberEl.textContent = counter.value.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          },
        }, '-=0.2'); // Start slightly before the previous animation ends
      });

      // Add the individual timeline to the master timeline
      masterTimeline.add(coordinateTl, `-=${config.staggerDelay}`);
    });
  };

  initIntroAnimation();
});
