import Pay from "../../models/maintenance/Pay.js";
const paysHelper = {};

paysHelper.validateExistPayById = async (id) => {
  try {
    const pay = await Pay.findById(id);
    if (!pay) {
      throw new Error(`El pago con el id ${id} no existe`);
    }
  } catch (error) {
    throw new Error(`El pago con el id ${id} no existe`);
  }
};

export { paysHelper };
