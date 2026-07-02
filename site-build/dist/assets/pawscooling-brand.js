(() => {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let footerFrame = 0;

  const updateFooterWordmark = () => {
    footerFrame = 0;
    const video = document.querySelector(".js-footer-v-background");
    if (!video) return;

    const rect = video.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const travel = Math.max(rect.height * 0.72, 1);
    const progress = clamp((viewportHeight * 0.82 - rect.top) / travel, 0, 1);

    video.style.setProperty("--paw-p-top-x", `${50 - 4 * progress}%`);
    video.style.setProperty("--paw-p-middle-x", `${50 + 2 * progress}%`);
    video.style.setProperty("--paw-p-bottom-x", `${50 - 3 * progress}%`);
    video.style.setProperty("--paw-core-top-x", `${50 - 3 * progress}%`);
    video.style.setProperty("--paw-core-bottom-x", `${50 + 3 * progress}%`);
    video.style.setProperty("--paw-g-top-x", `${50 + 4 * progress}%`);
    video.style.setProperty("--paw-g-middle-x", `${50 - 2 * progress}%`);
    video.style.setProperty("--paw-g-bottom-x", `${50 + 3 * progress}%`);
  };

  const requestFooterUpdate = () => {
    if (footerFrame) return;
    footerFrame = requestAnimationFrame(updateFooterWordmark);
  };

  const carouselSources = [
    "/images/pet-only-golden-retriever.jpg",
    "/images/pet-only-silver-tabby.jpg",
    "/images/pet-only-bearded-dragon.jpg",
  ];

  const setupHeroCarousels = () => {
    if (reduceMotion) return;

    const images = Array.from(
      document.querySelectorAll('.home-banner__content .slice-link[href="#contact"] .js-slice-image > img')
    );

    images.forEach((image, imageIndex) => {
      let slideIndex = carouselSources.findIndex((source) => image.src.endsWith(source));
      if (slideIndex < 0) slideIndex = imageIndex % carouselSources.length;

      window.setInterval(() => {
        if (document.hidden) return;

        slideIndex = (slideIndex + 1) % carouselSources.length;
        image.classList.add("is-changing");

        window.setTimeout(() => {
          image.src = carouselSources[slideIndex];
          image.alt = [
            "Golden retriever resting alone in a cool blue and white interior",
            "Silver tabby cat reclining alone in a cool blue and white interior",
            "Bearded dragon resting alone against a cool blue and white background",
          ][slideIndex];
          image.classList.remove("is-changing");
        }, 280);
      }, 4200 + imageIndex * 480);
    });
  };

  window.addEventListener("scroll", requestFooterUpdate, { passive: true });
  window.addEventListener("resize", requestFooterUpdate, { passive: true });
  window.addEventListener("load", () => {
    requestFooterUpdate();
    setupHeroCarousels();
  }, { once: true });

  requestFooterUpdate();
})();
