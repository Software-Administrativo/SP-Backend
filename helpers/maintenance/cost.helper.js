import Cost from "../../models/maintenance/Cost.js";

const costsHelper = {};

costsHelper.validateExistCostById = async (id) => {
  try {
    const cost = await Cost.findById(id);
    if (!cost) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El costo con el id ${id} no existe`);
  }
};

export { costsHelper };
