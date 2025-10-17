window.Webflow ||= [];
window.Webflow.push(() => {
  
  class TabGroupLinkInfo {
    constructor() {
      this.init();
    }
    
    init() {
      this.setupInitialState();
      this.setupTabObserver();
      this.setupResizeListener();
    }
    
    isMobileView() {
      return window.innerWidth <= 568;
    }
    
    getTargetSelector() {
      return this.isMobileView() 
        ? '.tab-group_link-content .tab-group_link-info .u-text-small, .tab-group-mobile-content' 
        : '.tab-group_link-content .tab-group_link-info .u-text-small';
    }
    
    setupInitialState() {
      const selector = this.getTargetSelector();
      const allElements = document.querySelectorAll(selector);
      allElements.forEach((element) => {
        gsap.set(element, { opacity: 0, display: 'none' });
      });
    }
    
    setupTabObserver() {
      const tabGroupLinks = document.querySelectorAll('.tab-group_link');
      
      if (!tabGroupLinks.length) return;
      
      tabGroupLinks.forEach(tabGroupLink => {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              this.handleTabChange();
            }
          });
        });
        
        observer.observe(tabGroupLink, {
          attributes: true,
          attributeFilter: ['class']
        });
      });
      
      this.handleTabChange();
    }
    
    setupResizeListener() {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.setupInitialState();
          this.handleTabChange();
        }, 150);
      });
    }
    
    handleTabChange() {
      const selector = this.getTargetSelector();
      const allElements = document.querySelectorAll(selector);
      
      allElements.forEach(element => {
        gsap.set(element, { opacity: 0, display: 'none' });
      });
      
      const activeTab = document.querySelector('.tab-group_link.w--current');
      
      if (activeTab) {
        const activeElement = activeTab.querySelector(selector);
        
        if (activeElement) {
          gsap.to(activeElement, {
            autoAlpha: 1,
            opacity: 1,
            display: 'block',
            duration: 0.75,
            ease: "power2.out"
          });
        }
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new TabGroupLinkInfo();
    });
  } else {
    new TabGroupLinkInfo();
  }
  
});
