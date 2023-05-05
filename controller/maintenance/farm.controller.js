import Farm from "../../models/maintenance/Farm.js";

const farmCtrl = {};

//get all farm
farmCtrl.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.json({ farms });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get farm by id in the db
farmCtrl.getFarmId = async (req, res) => {
  const { id } = req.params;
  try {
    const farm = await Farm.findById(id);
    res.json({ farm });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register farm in the db
farmCtrl.registerFarm = async (req, res) => {
  const { name, address, owner } = req.body;
  try {
    const newfarm = new Farm({
      name,
        address,
        owner,
    });
    const farm = await newfarm.save();
    res.json({ msg: "Finca creada correctamente", farm });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update farm in the db
farmCtrl.updateFarms = async (req, res) => {
  const { id } = req.params;
  const { name, address, owner } = req.body;
  try {
    await Farm.findByIdAndUpdate(id, {
      name,
        address,
        owner,
    });

    const farm = await Farm.findById(id);
    res.json({ msg: "Finca actualizada correctamente", farm });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active farm in the db
farmCtrl.activeFarms = async (req, res) => {
  const { id } = req.params;
  try {
    await Farm.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Finca activada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive farm in the db
farmCtrl.inactiveFarms = async (req, res) => {
  const { id } = req.params;
  try {
    await Farm.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Finca inactivada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { farmCtrl };