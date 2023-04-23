import Work from "../../models/maintenance/Work.js";

const worksHelper = {};

worksHelper.validateExistWorkById = async (id) => {
  try {
    const cost = await Work.findById(id);
    if (!cost) {
      throw new Error(`La labor con el id ${id} no existe`);
    }
  } catch (error) {
    throw new Error(`La labor con el id ${id} no existe`);
  }
};

export { worksHelper };
