import CostTrans from "../../models/transformation/CostTrans.js";

const costTransCtrl = {};

//get all cost of transformation
costTransCtrl.getCostTrans = async (req, res) => {
  const { farm } = req.headers;
  try {
    const cost = await CostTrans.find({ farm });
    res.json({ costs: cost });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get cost of transformation by id in the db
costTransCtrl.getCostTransId = async (req, res) => {
  const { id } = req.params;
  try {
    const cost = await CostTrans.findById(id);
    res.json({ cost });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register cost of transformation in the db
costTransCtrl.registerCostTrans = async (req, res) => {
  const { name, lot, description, cost } = req.body;
  const { farm } = req.headers;
  try {
    const newCostTrans = new CostTrans({
      name:name.trim().toUpperCase(),
      lot,
      description:description.trim(),
      cost,
      farm,
    });
    const costTrans = await newCostTrans.save();
    res.json({
      msg: "Costo de transformación registrado correctamente",
      cost: costTrans,
    });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update cost of transformation in the db
costTransCtrl.updateCostTrans = async (req, res) => {
  const { id } = req.params;
  const { name, lot, description, cost } = req.body;
  const { farm } = req.headers;
  try {
    await CostTrans.findByIdAndUpdate(id, {
      name:name.trim().toUpperCase(),
      lot,
      description:description.trim(),
      cost,
      farm,
    });

    const updateCostTrans = await CostTrans.findById(id);
    res.json({
      msg: "Costo de transformación actualizado correctamente",
      cost: updateCostTrans,
    });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//active cost of transformation in the db
costTransCtrl.activeCostTrans = async (req, res) => {
  const { id } = req.params;
  try {
    await CostTrans.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Costo de transformación activado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive cost of transformation in the db
costTransCtrl.inactiveCostTrans = async (req, res) => {
  const { id } = req.params;
  try {
    await CostTrans.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Costo de transformación desactivado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { costTransCtrl };
