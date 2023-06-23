import Product from "../../models/inventory/Product.js";
import Category from "../../models/inventory/Category.js";
import Mark from "../../models/inventory/Mark.js";

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


productHelper.validateExistCategoryById = async (id) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error();
        }
    }catch (error){
        throw new Error (`La categoria con el id ${id} no existe`);
    }
};


productHelper.validateExistMarkById = async (id) => {
    try {
        const mark = await Mark.findById(id);
        if (!mark) {
            throw new Error();
        }
    }catch (error){
        throw new Error (`La marca con el id ${id} no existe`);
    }
};



export { productHelper };