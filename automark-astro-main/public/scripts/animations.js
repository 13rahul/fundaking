/* global gsap, ScrollTrigger, Lenis */
import { sporeCanvas } from "./particleCanvas.js";

(function () {
  "use strict";

  const REVEAL_START = "top 85%";

  function initLenisScrollSync() {
    if (typeof Lenis === "undefined") return null;
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  /** @returns {boolean} */
  function motionLibsReady() {
    return typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  }

  function homeHeroTimeline() {
    const hero = document.querySelector("[data-home-hero]");
    if (!hero) return;

    const items = hero.querySelectorAll("[data-hero-item]");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 36, scale: 0.98 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      stagger: 0.12,
      ease: "power3.out",
    });
  }

  // Hero Video Showcase: GSAP 3D scroll tilt
  function heroVideo() {
    const mm = gsap.matchMedia();
    const gsapVideoShowcase = document.querySelectorAll(
      "[data-gsap-video-showcase]",
    );
    if (!gsapVideoShowcase.length) return;

    gsapVideoShowcase.forEach((el) => {
      mm.add("(min-width: 1280px)", () => {
        gsap.set(el, { scale: 0.8, rotationX: 10, top: -250 });
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "20% 95%",
            end: "0% 30%",
            scrub: true,
            markers: false,
          },
          scale: 1,
          rotationX: 0,
          top: 0,
          ease: "none",
        });
      });

      mm.add("(max-width: 1279px)", () => {
        gsap.set(el, { scale: 0.8, rotationX: 15 });
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "20% 95%",
            end: "0% 40%",
            scrub: true,
          },
          scale: 1,
          rotationX: 0,
          ease: "none",
        });
      });
    });
  }

  function updateTrustedPartners() {
    const partners = document.querySelector("[data-trusted-brands-images]");
    if (!partners) return;

    const images = JSON.parse(partners.dataset.trustedBrandsImages);
    const MAX = 7;

    function getRandomImages(list) {
      return [...list].sort(() => 0.5 - Math.random()).slice(0, MAX);
    }

    function render(list) {
      partners.textContent = "";
      const frag = document.createDocumentFragment();
      list.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Trusted Brand";
        img.draggable = false;
        frag.appendChild(img);
      });
      partners.appendChild(frag);
    }

    function animate() {
      const selected = getRandomImages(images);
      render(selected);
      const imgs = partners.children;

      gsap.fromTo(
        imgs,
        { opacity: 0, filter: "blur(10px)", y: -30 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, stagger: 0.15 },
      );

      gsap.to(imgs, {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        duration: 0.9,
        delay: 3,
        stagger: 0.15,
        onComplete: animate,
      });
    }

    animate();
  }

  function sporesEffect() {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const targetElementClassName = ".heroSporeCanvas";
    sporeCanvas(
      targetElementClassName,
      80,
      0.2,
      1.6,
      0.0,
      0.1,
      800,
    );
  }

  function pricingToggle() {
    const toggle = document.querySelector("[data-pricing-toggle]");
    const labels = document.querySelectorAll(".price-toggler-btn");
    if (!toggle) return;

    toggle.addEventListener("change", (e) => {
      const isYearly = e.target.checked;

      if (isYearly) {
        labels[0]?.classList.remove("active");
        labels[1]?.classList.add("active");
      } else {
        labels[0]?.classList.add("active");
        labels[1]?.classList.remove("active");
      }

      const monthlyElements = document.querySelectorAll(
        "[data-price-tag-monthly]",
      );
      const yearlyElements = document.querySelectorAll(
        "[data-price-tag-yearly]",
      );
      const elementsToHide = isYearly ? monthlyElements : yearlyElements;
      const elementsToShow = isYearly ? yearlyElements : monthlyElements;

      elementsToHide.forEach((el, index) => {
        setTimeout(() => {
          el.classList.remove("active");
          el.classList.add("inactive");
        }, index * 150);
      });

      elementsToShow.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("active");
          el.classList.remove("inactive");
        }, index * 150);
      });
    });
  }

  function scrollReveals() {
    const fadeUp = document.querySelectorAll('[data-animate="fade-up"]');
    fadeUp.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40, scale: 0.98 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: REVEAL_START,
          once: true,
        },
      });
    });

    const fadeIn = document.querySelectorAll('[data-animate="fade-in"]');
    fadeIn.forEach((el) => {
      gsap.set(el, { opacity: 0, scale: 0.99 });
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: REVEAL_START,
          once: true,
        },
      });
    });

    document.querySelectorAll("[data-animate-stagger]").forEach((container) => {
      const children = container.children;
      if (!children.length) return;

      const stagger = parseFloat(container.dataset.stagger || "0.1") || 0.1;

      gsap.set(children, { opacity: 0, y: 40, scale: 0.98 });
      gsap.to(children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: REVEAL_START,
          once: true,
        },
      });
    });
  }

  function initMotion() {
    gsap.registerPlugin(ScrollTrigger);
    initLenisScrollSync();
    homeHeroTimeline();
    heroVideo();
    updateTrustedPartners();
    sporesEffect();
    pricingToggle();
    scrollReveals();
    ScrollTrigger.refresh();
  }

  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (!motionLibsReady()) {
      return;
    }
    initMotion();
  }

  document.addEventListener("preloader:hidden", init);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (!document.getElementById("site-preloader")) init();
    });
  } else if (!document.getElementById("site-preloader")) {
    init();
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 250);
  });
})();
