import People from "../../models/maintenance/People.js";
import TypeDocument from "../../models/maintenance/TypeDocument.js";
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
peoplesHelper.validateExistTypeDocumentById = async (id) => {
    try {
        const typeDocument = await TypeDocument.findById(id, { status: 0 });
        if (!typeDocument) {
            throw new Error();
        }
    } catch (error) {
        throw new Error(`El tipo de documento con el id ${id} no existe, o no esta disponible`);
    }
}

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
