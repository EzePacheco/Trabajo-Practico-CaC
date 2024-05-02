// Login Validation:
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.createElement("p");
const contenedoresInput = document.querySelectorAll("div");

const handleEmail = (e) => {
  emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  console.log(emailRegex.test(e.target.value));
  if (!emailRegex.test(e.target.value)) {
    message.textContent = "e-mail no válido";
    message.classList.remove("isValid");
    message.classList.add("noValid");
    contenedoresInput[0].appendChild(message);
  } else {
    message.textContent = "e-mail válido";
    message.classList.remove("noValid");
    message.classList.add("isValid");
    contenedoresInput[0].appendChild(message);
  }
};

const handlePassword = (e) => {
  /*
    Minimo 8 caracteres
    Maximo 15
    Al menos una letra mayúscula
    Al menos una letra minucula
    Al menos un dígito
    No espacios en blanco (no lo toma)
    Al menos 1 caracter especial
*/
  passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/;
  if (!passRegex.test(e.target.value)) {
    message.textContent = "password no válido";
    message.classList.remove("isValid");
    message.classList.add("noValid");
    contenedoresInput[1].appendChild(message);
  } else {
    message.textContent = "password válido";
    message.classList.remove("noValid");
    message.classList.add("isValid");
    contenedoresInput[1].appendChild(message);
  }
};

email.addEventListener("input", handleEmail);
password.addEventListener("input", handlePassword);
