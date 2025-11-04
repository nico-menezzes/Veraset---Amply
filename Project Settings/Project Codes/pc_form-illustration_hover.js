window.Webflow ||= [];
window.Webflow.push(() => {
  // --- FORM ILLUSTRATION HOVER EFFECT ---
  const initFormIllustrationHover = () => {
    const trigger = document.querySelector('.illustration-wrap');
    const illustration = document.querySelector('.illustration-form');

    if (!trigger || !illustration) {
      console.warn('Form illustration elements not found.');
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();

    // Maps mouse position to a rotation value
    const getRotationFromMouse = (mouseX) => {
      const centerX = triggerRect.left + triggerRect.width / 2;
      const distance = mouseX - centerX;
      const rotation = distance * 0.1; // Adjust sensitivity
      return rotation;
    };

    // Handles mouse movement over the trigger area
    const handleMouseMove = (e) => {
      const rotation = getRotationFromMouse(e.clientX);
      gsap.to(illustration, {
        rotation,
        duration: 1.5,
        ease: 'power1.out',
      });
    };

    // Resets the illustration when the mouse leaves
    const handleMouseLeave = () => {
      gsap.to(illustration, {
        rotation: 0,
        duration: 1.5,
        ease: 'power1.out',
      });
    };

    trigger.addEventListener('mousemove', handleMouseMove);
    trigger.addEventListener('mouseleave', handleMouseLeave);
  };

  initFormIllustrationHover();
});

