import CostTrans from "../../models/transformation/CostTrans.js";
import Lots from "../../models/maintenance/Lots.js";

const costTransHelper = {};

costTransHelper.validateExistCostTransById = async (id) => {
  try {
    const cost = await CostTrans.findById(id);
    if (!cost) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El modelo con el id ${id} no existe`);
  }
};

costTransHelper.validateExistLotById = async (id) => {
  try {
    const lot = await Lots.findById(id, { status: 0 });
    if (!lot) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El lote con el id ${id} no existe, o esta inactivo`);
  }
};

export { costTransHelper };
