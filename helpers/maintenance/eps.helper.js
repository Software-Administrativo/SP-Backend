import Eps from "../../models/maintenance/Eps.js";
const epsHelper = {};

epsHelper.validateExistEpsById = async (id) => {
  try {
    const eps = await Eps.findById(id);
    if (!eps) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`La eps con el id ${id} no existe`);
  }
};

export { epsHelper };
