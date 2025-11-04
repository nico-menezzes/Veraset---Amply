window.Webflow ||= [];
window.Webflow.push(() => {
  if (!window.location.pathname.includes('/resource/')) {
    return; 
  }

  barba.init({
    transitions: [{
      name: 'fade',
      
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      },
      
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      }
    }],
    
    prevent: ({ href }) => {
      if (href.indexOf(window.location.host) === -1) {
        return true;
      }
      if (href.indexOf('#') > -1) {
        return true;
      }
      if (!href.includes('/resources/')) {
        return true;
      }
      return false;
    }
  });

  barba.hooks.after(() => {
    window.scrollTo(0, 0);
    
    if (window.Webflow) {
      window.Webflow.destroy();
      window.Webflow.ready();
      window.Webflow.require('ix2').init();
    }
  });
});
