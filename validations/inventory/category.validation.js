import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { categoryHelper } from "../../helpers/inventory/category.helper.js";

const { validateExistCategoryById, } = categoryHelper;
const { validateToken } = webToken;

const categoryVali = {}

//Validate if exist category 
categoryVali.validateExistCategoryById = [
    check("id","El id es obligatorio ").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistCategoryById(id);
    }),
    validateFields,
];

//Validate fields for register category 
categoryVali.validateRegisterCategory = [
    check("name","El nombre de la categoria es obligatorio").notEmpty().isString().exists(),
    check("descripcion","Descripcion de la categoria es obligatoria"),
    validateFields
];

//validate fields for update category
categoryVali.validateUpdateCategory = [
    check("id","El id es obligatorio").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistCategoryById(id);
    }),
    check("name","El nombre de la categoria es obligatorio").notEmpty().isString(),
    check("descripcion","Descipcion de la categoria es obligatoria").notEmpty().isString(),
    validateFields,
];

//validate token 
categoryVali.validateToken =[
    check('token').custom(async (token) => {
      await validateToken(token);
      }),
      validateFields,
];

export { categoryVali }