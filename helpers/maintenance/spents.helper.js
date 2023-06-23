import Spent from "../../models/maintenance/Spent.js";

const spentsHelper = {};

spentsHelper.validateExistSpendById = async (id) => {
  try {
    const spent = await Spent.findById(id);
    if (!spent) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El gasto con el id ${id} no existe`);
  }
};

export { spentsHelper };
