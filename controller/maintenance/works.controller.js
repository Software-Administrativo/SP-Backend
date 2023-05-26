import Work from "../../models/maintenance/Work.js";

const worksCtrl = {};

//get all works
worksCtrl.getWorks = async (req, res) => {
  const { farm } = req.headers;
  try {
    const works = await Work.find({ farm });
    res.json({ works });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get works by id in the db
worksCtrl.getWorkId = async (req, res) => {
  const { id } = req.params;
  try {
    const works = await Work.findById(id);
    res.json({ works });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register works in the db
worksCtrl.registerWork = async (req, res) => {
  const { name, description } = req.body;
  const { farm } = req.headers;
  try {
    const newWork = new Work({
      name,
      description,
      farm,
    });
    const works = await newWork.save();
    res.json({ msg: "Labor creado correctamente", works });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update works in the db
worksCtrl.updateWorks = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { farm } = req.headers;
  try {
    await Work.findByIdAndUpdate(id, {
      name,
      description,
      farm,
    });

    const updateWork = await Work.findById(id);
    res.json({ msg: "Labor actualizado correctamente", works: updateWork });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//active works in the db
worksCtrl.activeWorks = async (req, res) => {
  const { id } = req.params;
  try {
    await Work.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Labor activada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive works in the db
worksCtrl.inactiveWorks = async (req, res) => {
  const { id } = req.params;
  try {
    await Work.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Labor inactivada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { worksCtrl };
