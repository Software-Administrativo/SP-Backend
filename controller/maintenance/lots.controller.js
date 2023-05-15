import Lot from "../../models/maintenance/Lots.js";

const lotsCtrl = {};

//get all lots
lotsCtrl.getLots = async (req, res) => {
  const {farm} = req.headers;
  try {
    const lots = await Lot.find({ farm });
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
  const {
    name,
    areasize,
    lotestate,
    soildstate,
    classlote,
    fatherlot,
    sowingdensity,
    description,
  } = req.body;
  const { farm } = req.headers;
  try {
    const newLot = new Lot({
      name,
      areasize,
      lotestate,
      soildstate,
      classlote,
      fatherlot,
      sowingdensity,
      description,
      farm,
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
  const {farm} = req.headers;
  const {
    name,
    areasize,
    lotestate,
    soildstate,
    classlote,
    fatherlot,
    sowingdensity,
    description,
  } = req.body;
  try {
    await Lot.findByIdAndUpdate(id, {
      name,
      areasize,
      lotestate,
      soildstate,
      classlote,
      fatherlot,
      sowingdensity,
      description,
      farm,
    });

    const lot = await Lot.findById(id);
    res.json({ msg: "Lote actualizado correctamente", lot });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//function for desactive a lot father and sons
async function actionsFatherAndSons(lot,status) {
  const lotSons = await Lot.find({ fatherlot: lot._id });
  console.log('hijos',lotSons);

  for (let i = 0; i < lotSons.length; i++) {
    await Lot.findByIdAndUpdate(lotSons[i]._id, { status: status });
  }

  await Lot.findByIdAndUpdate(lot._id, { status: status });
}


//active lot in the db
lotsCtrl.activePays = async (req, res) => {
  const { id } = req.params;
  try {
    const lot = await Lot.findById(id);

    if (lot.classlote == "HIJO") {
        await Lot.findByIdAndUpdate(id, { status: 0 });
        res.json({ msg: "Lote HIJO activado correctamente" });
    } else {
      await actionsFatherAndSons(lot,0);
      res.json({ msg: "Lote PADRE e HIJOS activados correctamente" });
    }

  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive pay in the db
lotsCtrl.inactivePays = async (req, res) => {
  const { id } = req.params;
  try {
    const lot = await Lot.findById(id);

    if (lot.classlote == "HIJO") {
        await Lot.findByIdAndUpdate(id, { status: 1 });
        res.json({ msg: "Lote HIJO inactivado correctamente" });
    } else {
      console.log("entro");
      await actionsFatherAndSons(lot,1);
      res.json({ msg: "Lote PADRE e HIJOS inactivado correctamente" });
    }

  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { lotsCtrl };
