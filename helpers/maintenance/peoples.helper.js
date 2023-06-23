import People from "../../models/maintenance/People.js";
import Eps from "../../models/maintenance/Eps.js";
const peoplesHelper = {};

//validate if exist pay
peoplesHelper.validateExistPeopleById = async (id) => {
  try {
    const people = await People.findById(id);
    if (!people) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`La persona con el id ${id} no existe`);
  }
};

//validate if exist type document

peoplesHelper.validateExistDocument = async (document, farm, idPeople = null) => {
  try {
    const people = await People.findOne({ document, farm });

    if (idPeople && people) {
      if (people._id != idPeople) {
        throw new Error();
      }
    }

    if (people && idPeople == null) {
      throw new Error();
    }

  } catch (error) {
    throw new Error(`La persona con el documento ${document} ya existe`);
  }
};

peoplesHelper.validateExistNumber = async (phone, farm, idPeople = null) => {
  try {
    const people = await People.findOne({ phone, farm });

    if (idPeople && people) {
      if (people._id != idPeople) {
        throw new Error();
      }
    }

    if (people && idPeople == null) {
      throw new Error();
    }

  } catch (error) {
    throw new Error(`La persona con el telefono ${phone} ya existe`);
  }
};


//validate if exist eps
peoplesHelper.validateExistEpsById = async (id) => {
  try {
    const eps = await Eps.findById(id);
    if (!eps) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`La eps con el id ${id} no existe`);
  }
}

export { peoplesHelper };
