//Validacion de Formulario de Registro.
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const mensajeError = document.getElementById("mensajeError");

  const closeBtn = document.querySelector("#close-btn");

  const handleClose = () => {
    window.location.href = "../index.html";
  };

  closeBtn.addEventListener("click", handleClose);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Previene el envío del formulario para poder validarlo con Javascript

    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let terminos = document.getElementById("terminos").checked;

    // Validación de los campos
    if (nombre.trim() === "") {
      mensajeError.innerText = "El campo nombre no puede estar vacío.";
      return;
    }

    if (email.trim() === "") {
      mensajeError.innerText = "El campo email no puede estar vacío.";
      return;
    }

    if (!validarEmail(email)) {
      mensajeError.innerText = "El formato del email no es válido.";
      return;
    }

    if (password === "") {
      mensajeError.innerText = "El campo password no puede estar vacío.";
      return;
    }

    if (!validarPass(password)) {
      mensajeError.innerText = "La contraseña ingresada no es válida.";
      return;
    }

    if (!terminos) {
      mensajeError.innerText = "Debes aceptar los términos y condiciones.";
      return;
    }

    // Si todo está correcto, se puede proceder a enviar el formulario.
    mensajeError.innerText = "";
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
});
