  var Webflow = Webflow || []
  Webflow.push(function () {
    // If component does not exist, return
    if (!document.querySelector('.hero_single-coordinate')) return
    // If component needs to use an external library, load it here using the id.
    onLibrariesLoaded([], function () {
      // Select all count trigger sections
      const coordinatesEl = document.querySelectorAll('.hero_single-coordinate')
      if (!coordinatesEl) return
      
      const tl = gsap.timeline({ delay: 3.25 })

      coordinatesEl.forEach((coordinate) => {
        const countTrigger = coordinate.querySelector('[count-trigger]')
        const svgEmbed = coordinate.querySelector('.coordinate_embed svg path')
        const countNumbers = countTrigger.querySelectorAll('[count-number]')

        if (!countTrigger || !svgEmbed) return


        tl.from(coordinate, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.out',
        }).from(svgEmbed, {
          drawSVG: '0%',
          duration: 0.4,
          ease: 'power2.out',
        })

        countNumbers.forEach((number, i) => {
          const decimals = parseInt(number.getAttribute('count-decimals')) || 0
          const targetNumber = parseFloat(number.textContent.replace(/,/g, ''))
          const snapValue = decimals > 0 ? 1 / Math.pow(10, decimals) : 1


          tl.from(
            number,
            {
              textContent: 0,
              duration: 0.8,
              ease: 'power2.out',
              snap: { textContent: snapValue },
            }, !i ? undefined : '-=0.8'
          )
        })
      })

      function formatNumber(number, decimals) {
        return number.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      }
    })
  })
