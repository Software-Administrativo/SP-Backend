import Mark from "../../models/inventory/Mark.js";
const markHelper = {};

markHelper.validateExistMarkById = async (id) => {
    try {
        const mark = await Mark.findById(id);
        if (!mark) {
            throw new Error();
        }
    } catch (error){
        throw new Error (`La marca con el id ${id} no existe`);
    }
};
export { markHelper };