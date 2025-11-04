window.Webflow ||= [];
window.Webflow.push(() => {
  // --- DOCS CATEGORY LINK HIGHLIGHTING ---
  const initDocsCategoryHighlighting = () => {
    const config = {
      // Slugs to check for in the URL.
      slugs: ['datasets-schema', 'data-access-and-evaluation', 'privacy-and-compliance'],
      // The selector for the links, using the slug as the value.
      linkSelector: (slug) => `[data-link="${slug}"]`,
      // The class Webflow uses to style the current link.
      currentClass: 'w--current',
    };

    const currentPath = window.location.pathname;

    // Find which slug, if any, is present in the current URL path.
    const matchedSlug = config.slugs.find(slug => currentPath.includes(slug));

    // First, remove the .w--current class from all managed links.
    config.slugs.forEach(slug => {
      const link = document.querySelector(config.linkSelector(slug));
      if (link) {
        link.classList.remove(config.currentClass);
        link.removeAttribute('aria-current');
      }
    });

    // If a slug was matched in the URL, apply the .w--current class to the corresponding link.
    if (matchedSlug) {
      const targetLink = document.querySelector(config.linkSelector(matchedSlug));
      if (targetLink) {
        targetLink.classList.add(config.currentClass);
        targetLink.setAttribute('aria-current', 'page');
      }
    }
  };

  initDocsCategoryHighlighting();
});
