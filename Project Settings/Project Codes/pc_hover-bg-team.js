window.Webflow ||= [];
window.Webflow.push(() => {
  // Only run on desktop (not mobile/tablet)
  if (window.innerWidth < 1024) return;
  
  // Hover background team cursor follow effect
  const cardsTeamSection = document.querySelector('[data=cards-team]');
  const bgSlotTeamCursor = cardsTeamSection ? cardsTeamSection.querySelector('.bg-slot-team-cursor') : null;


  // Set initial state
  gsap.set(bgSlotTeamCursor, {
    opacity: 0,
    xPercent: -50,
    yPercent: -50
  });

  // Mouse move handler
  function handleMouseMove(e) {
    const rect = cardsTeamSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(bgSlotTeamCursor, {
      x: x,
      y: y,
      duration: 1.5,
      ease: "power1.out"
    });
  }

  // Mouse enter handler
  function handleMouseEnter() {
    gsap.to(bgSlotTeamCursor, {
      opacity: 0.6,
      duration: 0.4,
      ease: "power2.out"
    });
  }

  // Mouse leave handler
  function handleMouseLeave() {
    gsap.to(bgSlotTeamCursor, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  // Add event listeners
  cardsTeamSection.addEventListener('mouseenter', handleMouseEnter);
  cardsTeamSection.addEventListener('mouseleave', handleMouseLeave);
  cardsTeamSection.addEventListener('mousemove', handleMouseMove);

  // Cleanup function (optional - for when you need to remove listeners)
  window.cleanupHoverBgTeam = () => {
    cardsTeamSection.removeEventListener('mouseenter', handleMouseEnter);
    cardsTeamSection.removeEventListener('mouseleave', handleMouseLeave);
    cardsTeamSection.removeEventListener('mousemove', handleMouseMove);
  };
});
