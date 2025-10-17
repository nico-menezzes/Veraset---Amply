window.Webflow ||= [];
window.Webflow.push(() => {
  
  // Tab Products Change Animation
  class TabProductsChange {
    constructor() {
      this.init();
    }
    
    init() {
      this.setupTabObserver();
    }
    
    setupTabObserver() {
      // Observer para detectar mudanças nas tab-panes
      const tabProducts = document.querySelectorAll('.tab-products');
      
      if (!tabProducts.length) return;
      
      tabProducts.forEach(tabProduct => {
        // Encontrar todas as tab-panes dentro do container
        const tabPanes = tabProduct.querySelectorAll('[data-tab]');
        
        if (!tabPanes.length) return;
        
        // Observer para cada tab-pane
        tabPanes.forEach(tabPane => {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // Verificar se esta tab-pane ficou ativa
                if (tabPane.classList.contains('w--tab-active')) {
                  this.animateTabChange(tabPane);
                }
              }
            });
          });
          
          observer.observe(tabPane, {
            attributes: true,
            attributeFilter: ['class']
          });
        });
        
        // Animar na inicialização se já tiver tab ativa
        const activeTab = tabProduct.querySelector('.w--tab-active');
        if (activeTab) {
          this.animateTabChange(activeTab);
        }
      });
    }
    
    animateTabChange(activeTabPane) {
      // activeTabPane já é a tab-pane ativa
      if (!activeTabPane) return;
      
      // Elementos para animar dentro da tab-pane ativa
      const animateTab1 = activeTabPane.querySelector('[data="animate-tab-1"]');
      const animateTab2 = activeTabPane.querySelector('[data="animate-tab-2"]');
      
      // Reset inicial - esconder todos os elementos
      if (animateTab1) {
        gsap.set(animateTab1, { opacity: 0, y: 20 });
      }
      if (animateTab2) {
        gsap.set(animateTab2, { opacity: 0, y: 20 });
      }
      
      // Timeline da animação
      const tl = gsap.timeline();
      
      // Animar animate-tab-1 primeiro
      if (animateTab1) {
        tl.to(animateTab1, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }
      
      // Animar animate-tab-2 com delay
      if (animateTab2) {
        tl.to(animateTab2, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3"); // Começa 0.3s antes do animate-tab-1 terminar
      }
    }
  }
  
  // Inicializar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new TabProductsChange();
    });
  } else {
    new TabProductsChange();
  }
  
});
