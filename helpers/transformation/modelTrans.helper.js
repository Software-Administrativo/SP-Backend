import ModelTrans from "../../models/transformation/ModelTrans.js";

const modelTransHelper = {};

modelTransHelper.validateExistModelTransById = async (id) => {
  try {
    const model = await ModelTrans.findById(id);
    if (!model) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El modelo con el id ${id} no existe`);
  }
};

export { modelTransHelper };
