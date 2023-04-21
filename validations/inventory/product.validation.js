import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { productHelper } from "../../helpers/maintenance/product.helpers.js";

const { validateExistProductById, } = productHelper;

const productVali = {}

//Validate if exist product 
productVali.validateExistProductById = [
    check("id","El id es obligatorio ").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistProductById(id);
    }),
    validateFields,
];

//Validate fields for register product 
productVali.validateRegisterProduct = [
    check("name","El nombre del producto es obligatorio").notEmpty().isString().exists(),
    check("descripcion","Descripcion del producto es obligatoria"),
    validateFields
];

//validate fields for update product
productVali.validateUpdateProduct = [
    check("id","El id es obligatorio").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistProductById(id);
    }),
    check("name","El nombre del producto es obligatorio").notEmpty().isString(),
    check("descripcion","Descipcion del producto es obligatoria").notEmpty().isString(),
    validateFields,
];

export { productVali }