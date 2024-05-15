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
});
