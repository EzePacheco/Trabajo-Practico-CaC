const filterOptions = document.querySelectorAll(".filter-item");
const eventList = document.querySelector("#event-list");
const filterSelect = document.querySelector(".select-categories");

filterOptions.forEach((filter) => {
  filter.addEventListener(
    "click",
    () => (eventList.textContent = `Mostrando listado de ${filter.textContent}`)
  );
});

filterSelect.addEventListener(
  "change",
  (e) => (eventList.textContent = `Mostrando listado de ${e.target.value}`)
);
