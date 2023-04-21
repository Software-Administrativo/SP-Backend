import Cost from "../../models/maintenance/Cost.js";

const costsCtrl = {};

//get all costs
costsCtrl.getCosts = async (req, res) => {
  try {
    const costs = await Cost.find({ status: 0 });
    res.json({ costs });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//get cost by id in the db
costsCtrl.getCostId = async (req, res) => {
  const { id } = req.params;
  try {
    const cost = await Cost.findById(id);
    res.json({ cost });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//register cost in the db
costsCtrl.registerCost = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCost = new Cost({
      name,
      description,
    });
    const cost = await newCost.save();
    res.json({ msg: "Costo creado correctamente", cost });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//update cost in the db
costsCtrl.updateCosts = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await Cost.findByIdAndUpdate(id, {
      name,
      description,
    });

    const updateCost = await Cost.findById(id);
    res.json({ msg: "Costo actualizado correctamente", cost: updateCost });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//active cost in the db
costsCtrl.activeCosts = async (req, res) => {
  const { id } = req.params;
  try {
    await Cost.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Costo activado correctamente" });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

//inactive cost in the db
costsCtrl.inactiveCosts = async (req, res) => {
  const { id } = req.params;
  try {
    await Cost.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Costo inactivado correctamente" });
  } catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
};

export { costsCtrl };
