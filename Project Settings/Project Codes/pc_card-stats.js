var Webflow = Webflow || []
Webflow.push(function () {
  // If component does not exist, return
  if (!document.querySelector('.card-stats')) return
  
  // If component needs to use an external library, load it here using the id.
  onLibrariesLoaded([], function () {
    // Select the card-stats element and all text-stats elements
    const cardStats = document.querySelector('.card-stats')
    const textStatsElements = document.querySelectorAll('.text-stats')
    
    if (!cardStats || !textStatsElements.length) return
    
    // Store the original texts for all elements
    const originalTexts = Array.from(textStatsElements).map(el => el.textContent)
    
    // Create scramble animation function
    function scrambleText(element, originalText, duration = 2) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
      const textLength = originalText.length
      
      // Create timeline for scramble effect
      const tl = gsap.timeline()
      
      // Scramble phase - random characters
      tl.to(element, {
        duration: duration * 0.7,
        ease: "none",
        onUpdate: function() {
          let scrambledText = ''
          for (let i = 0; i < textLength; i++) {
            scrambledText += chars[Math.floor(Math.random() * chars.length)]
          }
          element.textContent = scrambledText
        }
      })
      
      // Reveal phase - gradually show correct characters
      tl.to(element, {
        duration: duration * 0.3,
        ease: "power2.out",
        onUpdate: function() {
          const progress = this.progress()
          let revealedText = ''
          
          for (let i = 0; i < textLength; i++) {
            const revealPoint = i / textLength
            if (progress >= revealPoint) {
              revealedText += originalText[i]
            } else {
              revealedText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          element.textContent = revealedText
        },
        onComplete: function() {
          element.textContent = originalText
        }
      })
    }
    
    // Create scroll trigger
    gsap.registerPlugin(ScrollTrigger)
    
    // Set up the scroll trigger
    ScrollTrigger.create({
      trigger: cardStats,
      start: "top 55%", // When card-stats reaches 45% of viewport (100% - 45% = 55%)
      onEnter: () => {
        // Reset all texts to original before scrambling
        textStatsElements.forEach((el, index) => {
          el.textContent = originalTexts[index]
        })
        
        // Start scramble animation for all elements with slight delay between them
        textStatsElements.forEach((element, index) => {
          setTimeout(() => {
            scrambleText(element, originalTexts[index], 1.5)
          }, index * 200) // 200ms delay between each element
        })
      },
      onLeave: () => {
        // Optional: reset when leaving
        textStatsElements.forEach((el, index) => {
          el.textContent = originalTexts[index]
        })
      },
      onEnterBack: () => {
        // Optional: re-trigger when scrolling back up
        textStatsElements.forEach((el, index) => {
          el.textContent = originalTexts[index]
        })
        
        textStatsElements.forEach((element, index) => {
          setTimeout(() => {
            scrambleText(element, originalTexts[index], 1.5)
          }, index * 200) // 200ms delay between each element
        })
      }
    })
  })
})
