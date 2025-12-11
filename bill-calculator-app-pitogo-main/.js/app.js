
// Smooth scroll from "See how it works"
const scrollBtn = document.getElementById("scrollToFeatures");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    const el = document.getElementById("features");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Intersection Observer for fade-in cards
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".fade-in")
    .forEach(el => observer.observe(el));
} else {
  // Fallback: make them visible immediately
  document
    .querySelectorAll(".fade-in")
    .forEach(el => el.classList.add("visible"));
}
