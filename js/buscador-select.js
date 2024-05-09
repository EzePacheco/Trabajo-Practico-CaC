const select = document.querySelector(".select");
const options_list = document.querySelector(".options-list");
const options = document.querySelectorAll(".option");
const select_value = document.querySelector("#select-value");

// Show and Hide Options
select.addEventListener("click", () => {
  options_list.classList.toggle("active");
});

// Select a value
options.forEach((option) => {
  option.addEventListener("click", () => {
    select_value.textContent = option.textContent;
    options_list.classList.toggle("active");
  });
});
