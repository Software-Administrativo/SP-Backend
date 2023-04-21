import Cost from "../../models/maintenance/Cost.js";

const costsHelper = {};

costsHelper.validateExistCostById = async (id) => {
  try {
    const cost = await Cost.findById(id);
    if (!cost) {
      throw new Error(`El pago con el id ${id} no existe`);
    }
  } catch (error) {
    throw new Error(`El pago con el id ${id} no existe`);
  }
};

export { costsHelper };
