import Lot from "../../models/maintenance/Lots.js";
const lotsHelper = {};

lotsHelper.validateExistLotById = async (id) => {
  try {
    const lot = await Lot.findById(id);
    if (!lot) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El pago con el id ${id} no existe`);
  }
};

lotsHelper.validateExistLotFatherById = async (id) => {
    try {
        //search the lots with the id and the class PADRE
        const lot = await Lot.findOne({ _id: id, classlote: "PADRE" });
        if (!lot) {
            throw new Error();
        }
    } catch (error) {
        throw new Error(`El lote PADRE con el id ${id} no existe`);
}
}
export { lotsHelper };
