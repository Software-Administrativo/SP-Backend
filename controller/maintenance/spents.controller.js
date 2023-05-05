import Spent from "../../models/maintenance/Spent.js";

const spentCtrl = {};

//get all spents
spentCtrl.getSpents = async (req, res) => {
  try {
    const spents = await Spent.find();
    res.json({ spents });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get spent by id in the db
spentCtrl.getSpentId = async (req, res) => {
  const { id } = req.params;
  try {
    const spent = await Spent.findById(id);
    res.json({ spent });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register spent in the db
spentCtrl.registerSpent = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newSpent = new Spent({
      name,
      description,
    });
    const spent = await newSpent.save();
    res.json({ msg: "Gasto creado correctamente", spent });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update spent in the db
spentCtrl.updateSpents = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await Spent.findByIdAndUpdate(id, {
      name,
      description,
    });

    const updateSpent = await Spent.findById(id);
    res.json({ msg: "Gasto actualizado correctamente", spent: updateSpent });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active spent in the db
spentCtrl.activeSpents = async (req, res) => {
  const { id } = req.params;
  try {
    await Spent.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Gasto activado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive spent in the db
spentCtrl.inactiveSpents = async (req, res) => {
  const { id } = req.params;
  try {
    await Spent.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Gasto inactivado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { spentCtrl };
