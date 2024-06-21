const loginUser = (req, res) => {
  console.log("Usuario Logueado");
  res.json({ msg: "Usuario Logueado" });
};

const registerUser = (req, res) => {
  console.log("Usuario Logueado");
  res.json({ msg: "Usuario Registrado" });
};

module.exports = {
  loginUser,
  registerUser,
};
