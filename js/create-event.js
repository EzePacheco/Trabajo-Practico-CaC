const formData = {
  title: "",
  date: "",
  time: "",
  place: "",
  direction: "",
  city: "",
  description: "",
  image: "",
};

const form = document.querySelector("#form-create");
const title = document.querySelector("#event-title");
const date = document.querySelector("#event-date");
const time = document.querySelector("#event-time");
const place = document.querySelector("#event-place");
const direction = document.querySelector("#event-direction");
const city = document.querySelector("#event-city");
const description = document.querySelector("#event-description");
const image = document.querySelector("#event-image");

const inputs = document.querySelectorAll(".field input, textarea");

// Add Event Listeners
form.addEventListener("submit", onSubmit);

inputs.forEach((input) => {
  input.addEventListener("change", onChange);
});

function onChange(e) {
  formData[e.target.name] = e.target.value;
}

function onSubmit(e) {
  e.preventDefault();
  if (Object.values(formData).includes("")) {
    const message = document.createElement("P");
    message.textContent = "Todos los campos son obligatorios";
    message.classList.add("message-error");
    form.appendChild(message);
    setTimeout(() => {
      message.remove();
    }, 2500);

    return;
  }

  console.log("Evento Creado Exitosamente!");
}
