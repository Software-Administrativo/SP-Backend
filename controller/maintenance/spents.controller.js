import Spent from "../../models/maintenance/Spent.js";

const spentCtrl = {};

//get all spents
spentCtrl.getSpents = async (req, res) => {
  const { farm } = req.headers;
  try {
    const spents = await Spent.find({ farm });
    res.json({ spents });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get spent by id in the db
spentCtrl.getSpentId = async (req, res) => {
  const { id } = req.params;
  try {
    const spent = await Spent.findById(id);
    res.json({ spent });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register spent in the db
spentCtrl.registerSpent = async (req, res) => {
  const { name, description } = req.body;
  const { farm } = req.headers;
  try {
    const newSpent = new Spent({
      name:name.trim().toUpperCase(),
      description:description.trim(),
      farm,
    });
    const spent = await newSpent.save();
    res.json({ msg: "Gasto creado correctamente", spent });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update spent in the db
spentCtrl.updateSpents = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { farm } = req.headers;
  try {
    await Spent.findByIdAndUpdate(id, {
      name:name.trim().toUpperCase(),
      description:description.trim(),
      farm,
    });

    const updateSpent = await Spent.findById(id);
    res.json({ msg: "Gasto actualizado correctamente", spent: updateSpent });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//active spent in the db
spentCtrl.activeSpents = async (req, res) => {
  const { id } = req.params;
  try {
    await Spent.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Gasto activado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive spent in the db
spentCtrl.inactiveSpents = async (req, res) => {
  const { id } = req.params;
  try {
    await Spent.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Gasto inactivado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { spentCtrl };
