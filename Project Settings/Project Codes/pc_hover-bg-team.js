window.Webflow ||= [];
window.Webflow.push(() => {
  // --- TEAM SECTION CURSOR FOLLOW BACKGROUND ---
  const initTeamCursorFollow = () => {
    const config = {
      section: '[data=cards-team]',
      cursorElement: '.bg-slot-team-cursor',
      desktopMinWidth: 1024,
    };

    if (window.innerWidth < config.desktopMinWidth) return;

    const section = document.querySelector(config.section);
    const cursorElement = section ? section.querySelector(config.cursorElement) : null;

    if (!section || !cursorElement) {
      console.warn('Team section or cursor element not found.');
      return;
    }

    // Set initial state of the cursor element.
    gsap.set(cursorElement, {
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
    });

    // Animate the cursor element's position on mouse move.
    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(cursorElement, {
        x: x,
        y: y,
        duration: 1.5,
        ease: 'power1.out',
      });
    };

    // Fade in the cursor element on mouse enter.
    const handleMouseEnter = () => {
      gsap.to(cursorElement, {
        opacity: 0.6,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    // Fade out the cursor element on mouse leave.
    const handleMouseLeave = () => {
      gsap.to(cursorElement, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    section.addEventListener('mousemove', handleMouseMove);
  };

  initTeamCursorFollow();
});
