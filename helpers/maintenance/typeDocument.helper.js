import TypeDocument from "../../models/maintenance/TypeDocument.js";
const typeDocumentHelper = {};

typeDocumentHelper.validateExistTypeDocumentById = async (id) => {
  try {
    const typeDocument = await TypeDocument.findById(id);
    if (!typeDocument) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El pago con el id ${id} no existe`);
  }
};

export { typeDocumentHelper };
