const filterOptions = document.querySelectorAll(".filter-item");
const eventList = document.querySelector("#event-list");

filterOptions.forEach((filter) => {
  filter.addEventListener(
    "click",
    () => (eventList.textContent = `Mostrando listado de ${filter.textContent}`)
  );
});
