import Category from "../../models/inventory/Category.js"
const categoryHelper = {};

categoryHelper.validateExistCategoryById = async (id) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error();
        }
    }catch (error) {
      throw new Error(`La categoria con el id ${id} no existe`);  
    }
};
export { categoryHelper };