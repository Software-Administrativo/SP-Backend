import User from "../models/User.js";
import webToken from "../middlewares/webToken.js";

const userCtrl = {};

//login user
userCtrl.loginUser = async (req, res) => {
  const { tpdocument, numdocument, password } = req.body;
  try {
    const user = await User.findOne({
      tpdocument,
      numdocument,
      status: 0,
    }).populate("farms");
    console.log(user);
    if (!user && user.farms.length == 0) {
      return res.json({ msg: "Credenciales incorrectas" });
    }
    const matchPassword = await user.matchPassword(password);
    if (!matchPassword) {
      return res.json({ msg: "Credenciales incorrectas" });
    }

    const token = await webToken.generateToken(user);

    res.json({
      msg: "Usuario logueado correctamente",
      token,
      farms: user.farms,
    });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register new user in the db
userCtrl.registerUser = async (req, res) => {
  const { name, tpdocument, numdocument, role, password, farms } = req.body;
  try {
    const newUser = new User({
      name,
      tpdocument,
      numdocument,
      role,
      password,
      farms,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update user in the db
userCtrl.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, tpdocument, numdocument, role, password, farms } = req.body;

  const passwordEncrypt = new User({ password });
  passwordEncrypt.password = await passwordEncrypt.encryptPassword(password);

  try {
    const user = await User.findById(id);
    if (user.role == "SUPER") {
      await User.findByIdAndUpdate(id, {
        name,
        tpdocument,
        numdocument,
        password: passwordEncrypt.password,
        farms,
      });
    } else {
      await User.findByIdAndUpdate(id, {
        name,
        tpdocument,
        numdocument,
        role,
        password: passwordEncrypt.password,
        farms,
      });
    }

    res.json({ msg: "Usuario actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get all users actives in the db
userCtrl.getUsers = async (req, res) => {
  const { farm } = req.headers;
  try {
    const users = await User.find({ farms: farm });
    res.json(users);
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};



//get user by id in the db
userCtrl.getUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("farms");
    res.json({ user });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active user in the db
userCtrl.activeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
    if(!user.farms.length == 0 && user.role != "SUPER"){
      return res.json({ msg: "El usuario debe tener al menos una finca asignada" });
    }
    await User.findByIdAndUpdate(id, { status: 0 });

    res.json({ msg: "Usuario activado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//deactive user in the db
userCtrl.inactiveUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Usuario desactivado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//logout user
userCtrl.logoutUser = async (req, res) => {
  try {
    res.json({ msg: "Usuario deslogueado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { userCtrl };
