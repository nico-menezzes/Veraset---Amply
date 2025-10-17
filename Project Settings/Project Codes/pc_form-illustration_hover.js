window.Webflow ||= [];
window.Webflow.push(() => {
  initFormIllustrationHover();
});

function initFormIllustrationHover() {
  const trigger = document.querySelector('.illustration-wrap');
  const illustration = document.querySelector('.illustration-form');
  
  if (!trigger || !illustration) {
    console.warn('Element .illustration-wrap or .illustration-form not found');
    return;
  }

  // Função para mapear a posição do mouse para rotação
  function mapMouseToRotation(mouseX, elementRect) {
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const relativeX = mouseX - elementCenterX;
    const normalizedX = relativeX / (elementRect.width / 2);
    
    // Limita entre -1 e 1, depois mapeia para -10deg a 10deg
    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    return clampedX * 10;
  }

  // Handler do mousemove
  function handleMouseMove(e) {
    const rect = trigger.getBoundingClientRect();
    const rotation = mapMouseToRotation(e.clientX, rect);
    
    // Animação bem suave e lenta com GSAP
    gsap.to(illustration, {
      rotation: rotation,
      duration: 1.5,
      ease: "power1.out"
    });
  }

  // Handler do mouseleave para voltar à posição original
  function handleMouseLeave() {
    gsap.to(illustration, {
      rotation: 0,
      duration: 1.5,
      ease: "power1.out"
    });
  }

  // Adiciona os event listeners no trigger
  trigger.addEventListener('mousemove', handleMouseMove);
  trigger.addEventListener('mouseleave', handleMouseLeave);
}

