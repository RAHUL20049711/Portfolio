const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

function syncThemeButton(theme) {
  const next = theme === "light" ? "dark" : "light";
  themeToggle.setAttribute("aria-label", `Switch to ${next} mode`);
}

syncThemeButton(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  syncThemeButton(next);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
