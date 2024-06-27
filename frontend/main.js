const menu_btn = document.querySelector("#navbar-icon");
const menu = document.querySelector(".navbar-menu");

// Open and Close mobile menu
menu_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("open");
  menu.classList.toggle("open");
});

// Close mobile menu at changing the viewport size
window.addEventListener("resize", () => {
  if (menu.classList.contains("open")) {
    menu_btn.classList.toggle("open");
    menu.classList.remove("open");
  }
});
