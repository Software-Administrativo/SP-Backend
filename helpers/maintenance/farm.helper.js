import Farm from "../../models/maintenance/Farm.js";
const farmHelper = {};

farmHelper.validateExistFarmById = async (id) => {
  try {
    const farm = await Farm.findById(id);
    if (!farm) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`La finca con el id ${id} no existe`);
  }
};

export { farmHelper };
