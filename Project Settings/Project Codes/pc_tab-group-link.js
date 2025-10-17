window.Webflow ||= [];
window.Webflow.push(() => {
  
  class TabGroupLink {
    constructor() {
      this.forceInterval = null;
      this.init();
    }
    
    init() {
      this.setupTabObserver();
      this.startForceRemoval();
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
    
    startForceRemoval() {
      this.forceInterval = setInterval(() => {
        this.handleTabChange();
      }, 100);
    }
    
    stopForceRemoval() {
      if (this.forceInterval) {
        clearInterval(this.forceInterval);
        this.forceInterval = null;
      }
    }
    
    handleTabChange() {
      const tabGroupLinks = document.querySelectorAll('.tab-group_link');
      
      if (!tabGroupLinks.length) return;
      
      tabGroupLinks.forEach(tabGroupLink => {
        const content = tabGroupLink.querySelector('.tab-group_link-content');
        if (content) {
          this.removeClassFromAllElements(content);
        }
      });
      
      const activeTab = document.querySelector('.tab-group_link.w--current');
      
      if (activeTab) {
        const activeContent = activeTab.querySelector('.tab-group_link-content');
        
        if (activeContent) {
          let classToAdd = null;
          
          for (let attr of activeTab.attributes) {
            const classMatch = attr.value.match(/\bcc-\w+/);
            if (classMatch) {
              classToAdd = classMatch[0];
              break;
            }
          }
          
          if (classToAdd) {
            this.addClassToAllElements(activeContent, classToAdd);
          }
        }
      }
    }
    
    removeClassFromAllElements(container) {
      const allElements = container.querySelectorAll('*');
      allElements.forEach(element => {
        const classesToRemove = Array.from(element.classList).filter(cls => cls.startsWith('cc-'));
        classesToRemove.forEach(cls => {
          element.classList.remove(cls);
          const currentClass = element.getAttribute('class');
          if (currentClass && currentClass.includes(cls)) {
            const newClass = currentClass.replace(new RegExp(`\\b${cls}\\b`, 'g'), '').trim();
            element.setAttribute('class', newClass);
          }
        });
      });
      
      const classesToRemove = Array.from(container.classList).filter(cls => cls.startsWith('cc-'));
      classesToRemove.forEach(cls => {
        container.classList.remove(cls);
        const currentClass = container.getAttribute('class');
        if (currentClass && currentClass.includes(cls)) {
          const newClass = currentClass.replace(new RegExp(`\\b${cls}\\b`, 'g'), '').trim();
          container.setAttribute('class', newClass);
        }
      });
    }
    
    addClassToAllElements(container, classToAdd) {
      const allElements = container.querySelectorAll('*');
      allElements.forEach(element => {
        element.classList.add(classToAdd);
      });
      
      container.classList.add(classToAdd);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new TabGroupLink();
    });
  } else {
    new TabGroupLink();
  }
  
});
