const formData = {
  name: "",
  email: "",
  message: "",
};

const form = document.querySelector("#form-contact");
const title = document.querySelector("#name");
const date = document.querySelector("#email");
const time = document.querySelector("#message");

const inputs = document.querySelectorAll(".field input, textarea");

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

  console.log("Mensaje enviado correctamente!");
}
