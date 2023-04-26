import Lot from "../../models/maintenance/Lots.js";

const lotsCtrl = {};

//get all lots
lotsCtrl.getLots = async (req, res) => {
  try {
    const lots = await Lot.find({ status: 0 });
    res.json({ lots });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get lots by id in the db
lotsCtrl.getLotId = async (req, res) => {
  const { id } = req.params;
  try {
    const lot = await Lot.findById(id);
    res.json({ lot });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register lot in the db
lotsCtrl.registerLot = async (req, res) => {
  const { name,areasize,lotestate,soildstate,classlote,fatherlot,sowingdensity,description } = req.body
  try {
    const newLot = new Lot({
      name,
      areasize,
      lotestate,
      soildstate,
      classlote,
      fatherlot,
      sowingdensity,
      description
    });
    const lot = await newLot.save();
    res.json({ msg: "Lote creado correctamente", lot });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update lot in the db
lotsCtrl.updateLots = async (req, res) => {
  const { id } = req.params;
  const { name,areasize,lotestate,soildstate,classlote,fatherlot,sowingdensity,description } = req.body
  try {
    await Lot.findByIdAndUpdate(id, {
      name,
      areasize,
      lotestate,
      soildstate,
      classlote,
      fatherlot,
      sowingdensity,
      description
    });

    const lot = await Lot.findById(id);
    res.json({ msg: "Lote actualizado correctamente", lot });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active lot in the db
lotsCtrl.activePays = async (req, res) => {
  const { id } = req.params;
  try {
    await Lot.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Lote activado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive pay in the db
lotsCtrl.inactivePays = async (req, res) => {
  const { id } = req.params;
  try {
    await Lot.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Lote inactivado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { lotsCtrl };
