import Costs from "../../models/costs/costsPlanting.js";
const costsHelper = {};

costsHelper.validateExistCostsById = async (id) => {
  try {
    const costs = await Costs.findById(id);
    if (!costs){
      throw new Error();
      }
    }catch (error) {
        throw new Error (`El costo de siembra con el id ${id} no existe`);
    }
  };
  export { costsHelper };