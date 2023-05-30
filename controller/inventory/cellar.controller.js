import Cellar from "../../models/inventory/Cellar.js";
const cellarCtrl = {};

//get all cellar
cellarCtrl.getCellar = async (req, res) => {
  const { farm } = req.headers;
  try {
    const cellar = await Cellar.find({ farm });
    res.json({ cellar });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get cellar by id
cellarCtrl.getCellarId = async (req, res) => {
  const { id } = req.params;
  try {
    const cellar = await Cellar.findById(id);
    res.json({ cellar });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register cellar in the db
cellarCtrl.registerCellar = async (req, res) => {
  const { name, tpcontract, description, cost } = req.body;
  const { farm } = req.headers;
  try {
    const newCellar = new Cellar({
      name,
      farm,
      tpcontract,
      description,
      cost,
    });
    console.log(newCellar);
    const cellar = await newCellar.save();
    res.json({ msg: "Bodega creada correctamente", cellar });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update cellar in the db
cellarCtrl.updateCellar = async (req, res) => {
  const { id } = req.params;
  const { name, tpcontract, description, cost } = req.body;
  const { farm } = req.headers;
  try {
    await Cellar.findByIdAndUpdate(id, {
      name,
      farm,
      tpcontract,
      description,
      cost,
    });
    const cellar = await Cellar.findById(id);
    res.json({ msg: "Bodega actualizado correctamente", cellar });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//activate cellar in the db
cellarCtrl.activateCellar = async (req, res) => {
  const { id } = req.params;
  try {
    await Cellar.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Bodega activado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive cellar in the db
cellarCtrl.inactiveCellar = async (req, res) => {
  const { id } = req.params;
  try {
    await Cellar.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Bodega inactivado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { cellarCtrl };
