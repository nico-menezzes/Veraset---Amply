window.Webflow ||= [];
window.Webflow.push(() => {
  
  class LinkCategoryDocs {
    constructor() {
      this.slugs = ['datasets-schema', 'data-access-and-evaluation', 'privacy-and-compliance'];
      this.init();
    }
    
    init() {
      this.handleCurrentPage();
      this.setupForceCurrent();
    }
    
    handleCurrentPage() {
      const url = window.location.href + ' ' + window.location.pathname;
      const matchedSlug = this.slugs.find(slug => url.includes(slug));
      
      this.removeCurrentFromAllLinks();
      if (matchedSlug) this.setCurrentLink(matchedSlug);
    }
    
    setCurrentLink(slug) {
      const targetLink = document.querySelector(`[data-link="${slug}"]`);
      if (targetLink) {
        targetLink.classList.add('w--current');
        targetLink.setAttribute('aria-current', 'page');
        targetLink.setAttribute('data-forced-current', 'true');
      }
    }
    
    removeCurrentFromAllLinks() {
      this.slugs.forEach(slug => {
        const link = document.querySelector(`[data-link="${slug}"]`);
        if (link) {
          link.classList.remove('w--current');
          link.removeAttribute('aria-current');
        }
      });
    }
    
    setupForceCurrent() {
      setInterval(() => {
        const url = window.location.href + ' ' + window.location.pathname;
        const matchedSlug = this.slugs.find(slug => url.includes(slug));
        
        if (matchedSlug) {
          this.removeCurrentFromAllLinks();
          this.setCurrentLink(matchedSlug);
        }
      }, 50);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LinkCategoryDocs());
  } else {
    new LinkCategoryDocs();
  }
  
});
