import UnitType from "../../models/maintenance/UnitType.js";

const unitTypesCtrl = {};

//get all unit Types in the db
unitTypesCtrl.getUnitTypes = async (req, res) => {
  const { farm } = req.headers;
  try {
    const unitType = await UnitType.find({ farm });
    res.json({ unitType });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get one unit Type in the db
unitTypesCtrl.getUnitTypesId = async (req, res) => {
  const { id } = req.params;
  try {
    const unitType = await UnitType.findById(id);
    res.json({ unitType });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register one unit Type in the db
unitTypesCtrl.registerUnitTypes = async (req, res) => {
  const { name, unittype } = req.body;
  const { farm } = req.headers;
  try {
    const newUnitType = new UnitType({
      name:name.trim().toUpperCase(),
      unittype,
      farm,
    });
    const unitType = await newUnitType.save();
    res.json({ msg: "Tipo de unidad creada correctamente", unitType });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update one unit Type in the db
unitTypesCtrl.updateUnitTypes = async (req, res) => {
  const { id } = req.params;
  const { name, unittype } = req.body;
  const { farm } = req.headers;
  try {
    await UnitType.findByIdAndUpdate(id, {
      name:name.trim().toUpperCase(),
      unittype,
      farm,
    });

    const updateUnitType = await UnitType.findById(id);
    res.json({ msg: "Tipo de unidad actualizada correctamente", unitType: updateUnitType });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active one unit Type in the db
unitTypesCtrl.activeUnitTypes = async (req, res) => {
  const { id } = req.params;
  try {
    await UnitType.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Tipo de unidad activada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive one unit Type in the db
unitTypesCtrl.inactiveUnitTypes = async (req, res) => {
  const { id } = req.params;
  try {
    await UnitType.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Tipo de unidad inactivada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { unitTypesCtrl };
