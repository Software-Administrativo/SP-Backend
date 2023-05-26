import Costs from "../../models/costs/CostsPlanting.js"
import Lot from "../../models/maintenance/Lots.js"
const costsHelper = {};

costsHelper.validateExistCostsById = async (id) => {
  try {
    const costs = await Costs.findById(id);
    if (!costs) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El costo de siembra con el id ${id} no existe`);
  }
};

costsHelper.validateExistLotById = async (id) => {
  try {
    const lot = await Lot.findById(id);
    if (!lot) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El lote con el id ${id} no existe`);
  }
}

export { costsHelper };