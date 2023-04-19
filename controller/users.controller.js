import User from "../models/User.js";

const userCtrl = {};

//login user
userCtrl.loginUser = async (req, res) => {
  const { tpdocument, numdocument, password } = req.body;

  try {
    const user = await User.findOne({ tpdocument, numdocument });
    if (!user) {
      return res.json({ message: "Credenciales incorrectas" });
    }
    const matchPassword = await user.matchPassword(password);
    if (!matchPassword) {
      return res.json({ message: "Credenciales incorrectas" });
    }
    /* const token = await user.getJwtToken(); */
    res.json({ msg: "Usuario logueado correctamente", token: "token" });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//register new user in the db
userCtrl.registerUser = async (req, res) => {
  const { name, tpdocument, numdocument, role, password } = req.body;
  try {
    const newUser = new User({
      name,
      tpdocument,
      numdocument,
      role,
      password,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//update user in the db
userCtrl.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, tpdocument, numdocument, role, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, {
      name,
      tpdocument,
      numdocument,
      role,
      password,
    });
    res.json({ msg: "Usuario actualizado correctamente", user });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//get all users actives in the db
userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find({ status: 0 });
    res.json(users);
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//get user by id in the db
userCtrl.getUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json({ user });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
}

//activate user in the db
userCtrl.activateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Usuario activado correctamente" });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//deactivate user in the db
userCtrl.inactiveUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Usuario desactivado correctamente" });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//logout user
userCtrl.logoutUser = async (req, res) => {
  try {
    res.json({ msg: "Usuario deslogueado correctamente" });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

export { userCtrl };
