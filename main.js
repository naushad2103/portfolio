// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Update GSAP on lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Custom Cursor Logic
const cursor = document.querySelector(".custom-cursor");
window.addEventListener("mousemove", (e) => {
  if (!cursor) return;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

const hoverTargets = document.querySelectorAll("a, button, .project-card");
hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => cursor?.classList.add("is-hovering"));
  target.addEventListener("mouseleave", () => cursor?.classList.remove("is-hovering"));
});

// Scroll Animations: The "Curved Distortion" Effect
const projectCards = gsap.utils.toArray(".project-card");
projectCards.forEach((card) => {
  gsap.fromTo(
    card,
    {
      scale: 0.8,
      "--curve-radius": "45%", // massive distortion
    },
    {
      scrollTrigger: {
        trigger: card,
        start: "top 100%", // triggers when top of card enters viewport
        end: "center center", // fully expanded when center of card hits center of viewport
        scrub: true,
      },
      scale: 1,
      "--curve-radius": "0px", // expands to actual shape
      ease: "power2.out",
    }
  );
});

// Apply similar distortion to full width sections
const textSections = gsap.utils.toArray([".hero.scroll-distortion", ".info-section.scroll-distortion"]);
textSections.forEach((section) => {
  gsap.fromTo(
    section,
    {
      scale: 0.9,
      "--curve-radius": "20%",
    },
    {
      scrollTrigger: {
        trigger: section,
        start: "top 100%",
        end: "center center",
        scrub: true,
      },
      scale: 1,
      "--curve-radius": "0px",
      ease: "power2.out",
    }
  );
});

// Footer Reveal Spacer Logic
function updateFooterReveal() {
  const footer = document.querySelector('.site-footer');
  const spacer = document.querySelector('.footer-spacer');
  if (footer && spacer) {
    spacer.style.height = `${footer.offsetHeight}px`;
  }
}
window.addEventListener('resize', updateFooterReveal);
window.addEventListener('load', updateFooterReveal);
updateFooterReveal();
