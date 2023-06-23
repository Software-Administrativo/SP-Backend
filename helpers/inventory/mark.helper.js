import Mark from "../../models/inventory/Mark.js";
import Category from "../../models/inventory/Category.js";
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


markHelper.validateExistCategoryById = async (categorySearch, farm) => {
    try{
        const category = await Category.findOne({ _id: categorySearch, farm });

        if (!category){
            throw new Error();
        }
    }catch (error){
        throw new  Error (`La categoria con el id ${categorySearch} no existe`);
    }
}
export { markHelper };