import Cellar from "../../models/inventory/Cellar.js";
const cellarHelper = {};

cellarHelper.validateExistCellarById = async (id) => {
    try {
        const cellar = await Cellar.findById(id);
        if (!cellar) {
            throw new Error ();
        }
    }catch (error) {
        throw new Error (`La bodega con el id ${id} no existe`);

    }
};
export { cellarHelper }