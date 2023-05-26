import ModelTrans from "../../models/transformation/ModelTrans.js";

const modelTransCtrl = {};

//get all models of transformation
modelTransCtrl.getModelTrans = async (req, res) => {
  const { farm } = req.headers;
  try {
    const models = await ModelTrans.find({ farm });
    res.json({ models });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get models of transformation by id in the db
modelTransCtrl.getModelTransId = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await ModelTrans.findById(id);
    res.json({ model });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register models of transformation in the db
modelTransCtrl.registerModelTrans = async (req, res) => {
  const { name, description, unitvalue } = req.body;
  const { farm } = req.headers;
  try {
    const newModelTrans = new ModelTrans({
      name,
      description,
      unitvalue,
      farm,
    });
    const model = await newModelTrans.save();
    res.json({ msg: "Modelo de panela creado correctamente", model });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update models of transformation in the db
modelTransCtrl.updateModelTrans = async (req, res) => {
  const { id } = req.params;
  const { name, description, unitvalue } = req.body;
  const { farm } = req.headers;
  try {
    await ModelTrans.findByIdAndUpdate(id, {
      name,
      description,
      unitvalue,
      farm,
    });

    const updateModelTrans = await ModelTrans.findById(id);
    res.json({
      msg: "Modelo de panela actualizado correctamente",
      model: updateModelTrans,
    });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//active models of transformation in the db
modelTransCtrl.activeModelTrans = async (req, res) => {
  const { id } = req.params;
  try {
    await ModelTrans.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Modelo de panela activado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive models of transformation in the db
modelTransCtrl.inactiveModelTrans = async (req, res) => {
  const { id } = req.params;
  try {
    await ModelTrans.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Modelo de panela inactivado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { modelTransCtrl };
