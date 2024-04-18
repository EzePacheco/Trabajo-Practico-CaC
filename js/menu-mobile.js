const menu_btn = document.querySelector("#navbar-icon");
const menu = document.querySelector(".menu-mobile");

menu_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("open");
  menu.classList.toggle("show");
});
