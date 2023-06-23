import UnitType from "../../models/maintenance/UnitType.js";

const unitTypeHelper = {};

unitTypeHelper.validateExistUnitTypeById = async (id) => {
  try {
    const cost = await UnitType.findById(id);
    if (!cost) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El tipo de unidad  con el id ${id} no existe`);
  }
};

export { unitTypeHelper };
