import Product from "../../models/inventory/Product.js";
const productHelper = {};

productHelper.validateExistProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error();
        }
    }catch (error){
        throw new Error (`El producto con el id ${id} no existe`);
    }
};
export { productHelper };