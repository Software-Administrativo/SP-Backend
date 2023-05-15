import Costs from "../../models/costs/CostsPlanting.js"
const costsHelper = {};

costsHelper.validateExistCostsById = async (id) => {
  try {
    const costs = await Costs.findById(id);
    if (!costs){
      throw new Error();
      }
    }catch (error) {
        throw new Error (`La categoría con el id ${id} no existe`);
    }
  };
  export { costsHelper };