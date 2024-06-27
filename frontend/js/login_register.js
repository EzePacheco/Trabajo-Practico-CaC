// Login Validation:
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.createElement("p");
const contenedoresInput = document.querySelectorAll("div");
const closeBtn = document.querySelector("#close-btn");

const handleClose = () => {
  window.location.href = "../index.html";
  // window.history.go(-1);
};

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
    message.textContent =
      "password de 8 a 15 caracteres alfanuméricos, Mayús. Minús. y caracter especial";
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
closeBtn.addEventListener("click", handleClose);

// Register Validations
const formulario = document.getElementById("formulario");
const mensajeError = document.getElementById("mensajeError");

closeBtn.addEventListener("click", handleClose);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Previene el envío del formulario para poder validarlo con Javascript

  let nombre = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let terminos = document.getElementById("terminos").checked;

  // Validación de los campos
  if (nombre.trim() === "") {
    mensajeError.innerHTML = "El campo nombre no puede estar vacío.";
    mensajeError.classList.add("noValid");
    return;
  }

  if (email.trim() === "") {
    mensajeError.innerHTML = "El campo email no puede estar vacío.";
    mensajeError.classList.add("noValid");
    return;
  }

  if (!validarEmail(email)) {
    mensajeError.innerHTML = "El formato del email no es válido.";
    mensajeError.classList.add("noValid");
    return;
  }

  if (password === "") {
    mensajeError.innerHTML = "El campo password no puede estar vacío.";
    mensajeError.classList.add("noValid");
    return;
  }

  if (!validarPass(password)) {
    mensajeError.innerHTML = "La contraseña ingresada no es válida.";
    mensajeError.classList.add("noValid");
    return;
  }

  if (!terminos) {
    mensajeError.innerHTML = "Debes aceptar los términos y condiciones.";
    mensajeError.classList.add("noValid");
    return;
  }

  // Si todo está correcto, se puede proceder a enviar el formulario.
  mensajeError.innerHTML = "";
  // alert('Formulario enviado con éxito!');
  formulario.submit();
});

function validarEmail(email) {
  const valEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return valEmail.test(String(email).toLowerCase());
}

function validarPass(password) {
  const valPass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return valPass.test(password);
}
