window.Webflow ||= [];
window.Webflow.push(() => {
  
  // Media query para desktop
  const desktopMediaQuery = window.matchMedia('(min-width: 769px)');

  // Array de cores disponíveis
  const colors = [
    'var(--_color-palette---medium-purple)',
    'var(--_color-palette---ebfc79)',
    'var(--_color-palette---ed793b)',
    'var(--_color-palette---86a5b8)',
    'var(--_color-palette---bee7f3)',
    'var(--_color-palette---ecbda3)'
  ];

  // Função para obter cor aleatória
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Função para aplicar efeito de hover
  function initHoverEffect() {
    if (!desktopMediaQuery.matches) return;

    const gridSquares = document.querySelectorAll('.grid-bg_square');
    
    // Remover event listeners existentes primeiro
    gridSquares.forEach(square => {
      square.removeEventListener('mouseenter', handleMouseEnter);
      square.removeEventListener('mouseleave', handleMouseLeave);
    });
    
    gridSquares.forEach(square => {
      // Hover in - apenas mudança de cor
      square.addEventListener('mouseenter', handleMouseEnter);
      square.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  // Funções separadas para evitar duplicação
  function handleMouseEnter(e) {
    const square = e.target;
    gsap.to(square, {
      backgroundColor: getRandomColor(),
      duration: 0.3,
      ease: "power2.out"
    });
  }

  function handleMouseLeave(e) {
    const square = e.target;
    gsap.to(square, {
      backgroundColor: 'rgba(189, 189, 180, 0.2)',
      duration: 0.3,
      ease: "power2.out"
    });
  }


  // Função para remover efeitos
  function removeEffects() {
    const gridSquares = document.querySelectorAll('.grid-bg_square');
    gridSquares.forEach(square => {
      gsap.set(square, { backgroundColor: 'rgba(189, 189, 180, 0.2)' });
    });
  }

  // Função para aplicar efeitos
  function applyEffects() {
    removeEffects(); // Limpar primeiro
    initHoverEffect();
  }

  // Listener para mudanças de media query
  desktopMediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
      // Desktop: aplicar efeitos
      setTimeout(applyEffects, 100);
    } else {
      // Mobile: remover efeitos
      removeEffects();
    }
  });

  // Inicializar quando a página carrega
  if (desktopMediaQuery.matches) {
    // Aguardar um pouco para garantir que os quadrados foram criados
    setTimeout(applyEffects, 500);
  }

});

