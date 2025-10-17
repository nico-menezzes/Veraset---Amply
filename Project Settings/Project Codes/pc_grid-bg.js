window.Webflow ||= [];
window.Webflow.push(() => {
  
  // Função para criar grid automaticamente
  function createAutoGrid() {
    const gridContainer = document.querySelector('.grid-bg');
    if (!gridContainer) return;

    // Limpar grid existente
    gridContainer.innerHTML = '';

    // Dimensões do quadrado (32px)
    const squareSize = 32;
    
    // Calcular número de colunas e linhas
    const containerWidth = gridContainer.offsetWidth;
    const containerHeight = gridContainer.offsetHeight;
    
    const columns = Math.floor(containerWidth / squareSize);
    const rows = Math.floor(containerHeight / squareSize);

    // Criar quadrados automaticamente
    for (let i = 0; i < columns * rows; i++) {
      const square = document.createElement('div');
      square.className = 'grid-bg_square';
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      square.style.backgroundColor = 'rgba(189, 189, 180, 0.2)';
      
      gridContainer.appendChild(square);
    }

    console.log(`Grid criado: ${columns} colunas x ${rows} linhas = ${columns * rows} quadrados`);
  }

  // Função para redimensionar quando a tela muda
  function handleResize() {
    let resizeTimeout;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      createAutoGrid();
    }, 100);
  }

  // Inicializar quando a página carrega
  createAutoGrid();

  // Escutar mudanças de tamanho
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', () => {
    setTimeout(createAutoGrid, 100);
  });

});
