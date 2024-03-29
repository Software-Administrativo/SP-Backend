import Pay from "../../models/maintenance/Pay.js";

const paysCtrl = {};

//get all pays
paysCtrl.getPays = async (req, res) => {
  const { farm } = req.headers;
  try {
    const pays = await Pay.find({ farm });
    res.json({ pays });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get pay by id in the db
paysCtrl.getPayId = async (req, res) => {
  const { id } = req.params;
  try {
    const pay = await Pay.findById(id);
    res.json({ pay });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register pay in the db
paysCtrl.registerPay = async (req, res) => {
  const { name, tpcontrato, description, valor } = req.body;
  const { farm } = req.headers;
  try {
    const newPay = new Pay({
      name:name.trim().toUpperCase(),
      // tpcontrato,
      description:description.trim(),
      // valor,
      farm,
    });
    const pay = await newPay.save();
    res.json({ msg: "Pago creado correctamente", pay });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update pay in the db
paysCtrl.updatePays = async (req, res) => {
  const { id } = req.params;
  const { name, tpcontrato, description, valor } = req.body;
  const { farm } = req.headers;
  try {
    await Pay.findByIdAndUpdate(id, {
      name:name.trim().toUpperCase(),
      // tpcontrato,
      description:description.trim(),
      // valor,
      farm,
    });

    const pay = await Pay.findById(id);
    res.json({ msg: "Pago actualizado correctamente", pay });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//active pay in the db
paysCtrl.activePays = async (req, res) => {
  const { id } = req.params;
  try {
    await Pay.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Pago activado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive pay in the db
paysCtrl.inactivePays = async (req, res) => {
  const { id } = req.params;
  try {
    await Pay.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Pago inactivado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { paysCtrl };
