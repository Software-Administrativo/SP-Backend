import TypeDocument from "../../models/maintenance/TypeDocument.js";

const typeDocumentCtrl = {};

//get all type of documents
typeDocumentCtrl.getTypeDocuments = async (req, res) => {
  const {farm} = req.headers;
  try {
    const typeDocuments = await TypeDocument.find({ farm });
    res.json({ typeDocuments });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get type of document by id in the db
typeDocumentCtrl.getTypeDocumentId = async (req, res) => {
  const { id } = req.params;
  try {
    const typeDocument = await TypeDocument.findById(id);
    res.json({ typeDocument });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register type of document in the db
typeDocumentCtrl.registerTypeDocument = async (req, res) => {
  const { name, tpcontrato, description, valor } = req.body;
  const {farm} = req.headers;
  try {
    const newTypeDocument = new TypeDocument({
      name,
      description,
      farm,
    });
    const typeDocument = await newTypeDocument.save();
    res.json({ msg: "Tipo de documento creado correctamente", typeDocument });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update type of document in the db
typeDocumentCtrl.updateTypeDocuments = async (req, res) => {
  const { id } = req.params;
  const { name, tpcontrato, description, valor } = req.body;
  const {farm} = req.headers;
  try {
    await TypeDocument.findByIdAndUpdate(id, {
      name,
      // tpcontrato,
      description,
      // valor,
      farm,
    });

    const typeDocument = await TypeDocument.findById(id);
    res.json({ msg: "Tipo de documento actualizado correctamente", typeDocument });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active type of document in the db
typeDocumentCtrl.activeTypeDocuments = async (req, res) => {
  const { id } = req.params;
  try {
    await TypeDocument.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Tipo de documento activado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive type of document in the db
typeDocumentCtrl.inactiveTypeDocuments = async (req, res) => {
  const { id } = req.params;
  try {
    await TypeDocument.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Pago inactivado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { typeDocumentCtrl };
