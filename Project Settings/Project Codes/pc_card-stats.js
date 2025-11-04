window.Webflow ||= [];
window.Webflow.push(() => {
  // --- CARD STATS SCRAMBLE ANIMATION (MANUAL EFFECT) ---
  const initCardStatsAnimation = () => {
    const cardStats = document.querySelector('.card-stats');
    if (!cardStats) return;

    gsap.registerPlugin(ScrollTrigger);

    const textStatsElements = gsap.utils.toArray('.text-stats');
    if (!textStatsElements.length) {
      console.warn('Text stats elements not found for scramble animation.');
      return;
    }

    const originalTexts = textStatsElements.map((el) => el.textContent);

    // Creates the manual scramble animation timeline for a single element.
    const createScrambleAnimationFor = (element, originalText) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      const tl = gsap.timeline();
      const textLength = originalText.length;

      // Phase 1: Rapidly changing random characters.
      tl.to(element, {
        duration: 0.7,
        ease: 'none',
        onUpdate: () => {
          let scrambledText = '';
          for (let i = 0; i < textLength; i++) {
            scrambledText += chars[Math.floor(Math.random() * chars.length)];
          }
          element.textContent = scrambledText;
        },
      });

      // Phase 2: Gradually revealing the original text.
      tl.to(element, {
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: function() {
          const progress = this.progress();
          let revealedText = '';
          for (let i = 0; i < textLength; i++) {
            if (progress >= i / textLength) {
              revealedText += originalText[i];
            } else {
              revealedText += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          element.textContent = revealedText;
        },
        onComplete: () => {
          element.textContent = originalText;
        },
      });
      return tl;
    };

    const masterTimeline = gsap.timeline({ paused: true });

    textStatsElements.forEach((element, index) => {
      const singleAnimation = createScrambleAnimationFor(element, originalTexts[index]);
      masterTimeline.add(singleAnimation, index * 0.2); // Stagger by 0.2s
    });
    
    const resetTexts = () => {
      textStatsElements.forEach((el, index) => {
        el.textContent = originalTexts[index];
      });
    };

    ScrollTrigger.create({
      trigger: cardStats,
      start: 'top 55%',
      onEnter: () => masterTimeline.restart(),
      onEnterBack: () => masterTimeline.restart(),
      onLeave: () => {
        masterTimeline.pause(0);
        resetTexts();
      },
      onLeaveBack: () => {
        masterTimeline.pause(0);
        resetTexts();
      },
    });
  };

  initCardStatsAnimation();
});
