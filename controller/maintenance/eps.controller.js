import Eps from "../../models/maintenance/Eps.js";

const epsCtrl = {};

//get all eps
epsCtrl.getEps = async (req, res) => {
  try {
    const eps = await Eps.find({ status: 0 });
    res.json({ eps });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get eps by id in the db
epsCtrl.getEpsId = async (req, res) => {
  const { id } = req.params;
  try {
    const eps = await Eps.findById(id);
    res.json({ eps });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register eps in the db
epsCtrl.registerEps = async (req, res) => {
  const { name, description, observation } = req.body;
  try {
    const newEps = new Eps({
      name,
      description,
      observation,
    });
    const eps = await newEps.save();
    res.json({ msg: "Eps creado correctamente", eps });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update eps in the db
epsCtrl.updateEps = async (req, res) => {
  const { id } = req.params;
  const { name, description, observation } = req.body;
  try {
    await Eps.findByIdAndUpdate(id, {
      name,
      description,
      observation,
    });

    const eps = await eps.findById(id);
    res.json({ msg: "Eps actualizado correctamente", pay });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active pay in the db
epsCtrl.activeEps = async (req, res) => {
  const { id } = req.params;
  try {
    await Eps.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Eps activada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive pay in the db
epsCtrl.inactiveEps = async (req, res) => {
  const { id } = req.params;
  try {
    await Eps.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Eps inactivada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { epsCtrl };
