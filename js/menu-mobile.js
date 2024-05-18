const menu_btn = document.querySelector("#navbar-icon");
const menu = document.querySelector(".navbar-menu");

menu_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("open");
  menu.classList.toggle("open");
});

window.addEventListener("resize", () => {
  if (menu.classList.contains("open")) {
    menu_btn.classList.toggle("open");
    menu.classList.remove("open");
  }
});
