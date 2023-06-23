import Stage from "../../models/maintenance/Stage.js";
import Lot from "../../models/maintenance/Lots.js";

const stagesHelper = {};

stagesHelper.validateExistStageById = async (id) => {
  try {
    const stage = await Stage.findById(id);
    if (!stage) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`La etapa con el id ${id} no existe`);
  }
};

stagesHelper.validateExistLotById = async (id) => {
    try {
        const lot = await Lot.findById(id);
        if (!lot) { 
            throw new Error();
        }
    } catch (error) {
        throw new Error(`El lote con el id ${id} no existe`);
    }
};


export { stagesHelper };
