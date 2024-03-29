import jwt_decode from "jwt-decode";

import Farm from "../../models/maintenance/Farm.js";
import User from "../../models/user/User.js";

const farmCtrl = {};

//get all farm
farmCtrl.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.json({ farms });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get farm by id in the db
farmCtrl.getFarmId = async (req, res) => {
  const { id } = req.params;
  try {
    const farm = await Farm.findById(id);
    res.json({ farm });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register farm in the db
farmCtrl.registerFarm = async (req, res) => {
  const { token } = req.headers;
  const { id, rol } = jwt_decode(token);

  if (rol != "SUPER")
    res
      .status(401)
      .json({ msg: "No tienes permisos para realizar esta accion" });


  const { name, address, owner } = req.body;
  try {
    const newfarm = new Farm({
      name:name.trim().toUpperCase(),
        address,
        owner,
    });
    const farm = await newfarm.save();

    //agregar a farms del usuario la nueva finca
    const user = await User.findById(id);
    user.farms.push(farm._id);
    await user.save();

    return res.json({ msg: "Finca creada correctamente", farm });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update farm in the db
farmCtrl.updateFarms = async (req, res) => {
  const { token } = req.headers;
  const tokenDecode = jwt_decode(token);
  const rol = tokenDecode.rol;

  if (rol != "SUPER")
    res
      .status(401)
      .json({ msg: "No tienes permisos para realizar esta accion" });

  const { id } = req.params;
  const { name, address, owner } = req.body;
  try {
    await Farm.findByIdAndUpdate(id, {
      name:name.trim().toUpperCase(),
        address,
        owner,
    });

    const farm = await Farm.findById(id);
    res.json({ msg: "Finca actualizada correctamente", farm });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//active farm in the db
farmCtrl.activeFarms = async (req, res) => {
  const { id } = req.params;
  try {
    await Farm.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Finca activada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive farm in the db
farmCtrl.inactiveFarms = async (req, res) => {
  const { id } = req.params;
  try {
    let newUsers = [];
    //search all users with the farm id
    const users = await User.find({
      farms: id,
      status: 0,
    });

    //for each user, remove the farm id and update the user
    for (let user of users) {
      const index = user.farms.indexOf(id);
      user.farms.splice(index, 1);
      if (user.farms.length === 0 && user.role !== "SUPER") user.status = 1;
      newUsers.push(user);
    }
    for (let user of newUsers) {
      await User.findByIdAndUpdate(user._id, user);
    }

    await Farm.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Finca inactivada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { farmCtrl };
