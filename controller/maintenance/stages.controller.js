import Stage from "../../models/maintenance/Stage.js";

const stagesCtrl = {};

//get all stages
stagesCtrl.getStages = async (req, res) => {
  const { farm } = req.headers;
  try {
    const stages = await Stage.find({ farm });
    res.json({ stages });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get stage by id in the db
stagesCtrl.getStageId = async (req, res) => {
  const { id } = req.params;
  try {
    const stage = await Stage.findById(id);
    res.json({ stage });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register stage in the db
stagesCtrl.registerStage = async (req, res) => {
  const { name, description,lot } = req.body;
  const { farm } = req.headers;
  try {
    const newStage = new Stage({
      name,
      description,
      lot,
      farm
    });
    const stage = await newStage.save();
    res.json({ msg: "Etapa creado correctamente", stage });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update stage in the db
stagesCtrl.updateStages = async (req, res) => {
  const { id } = req.params;
  const { name, description,lot } = req.body;
  const { farm } = req.headers;
  try {
    await Stage.findByIdAndUpdate(id, {
      name,
      description,
      lot,
      farm
    });

    const updateStage = await Stage.findById(id);
    res.json({ msg: "Etapa actualizada correctamente", stage: updateStage });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active stage in the db
stagesCtrl.activeStages = async (req, res) => {
  const { id } = req.params;
  try {
    await Stage.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Etapa activada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive stage in the db
stagesCtrl.inactiveStages = async (req, res) => {
  const { id } = req.params;
  try {
    await Stage.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Etapa desactivada correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { stagesCtrl };
