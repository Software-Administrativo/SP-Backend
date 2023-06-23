import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { productHelper } from "../../helpers/inventory/product.helper.js";

const { validateExistProductById,validateExistCategoryById,validateExistMarkById } = productHelper;
const { validateToken, validateFarm } = webToken;

const productVali = {}

//Validate if exist product 
productVali.validateExistProductById = [
    check("id","El id es obligatorio ").notEmpty().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistProductById(id);
    }),
    check('token').custom(async (token, {req}) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
      }),
    validateFields,
];

//Validate fields for register product 
productVali.validateRegisterProduct = [
  check("name","El nombre del producto es obligatorio").notEmpty(),
  check("amount","La cantidad del producto es obligatoria").notEmpty(),
  check("amount","La cantidad del producto debe ser un numero").isNumeric(),
  check("category","La categoria del producto es obligatoria").notEmpty(),
  check("category").custom(async (category) => {
      await validateExistCategoryById(category);
  }),
  check("mark","La marca del producto es obligatoria").notEmpty(),
  check("mark").custom(async (mark) => {
      await validateExistMarkById(mark);
  }),
  check("description","Descipcion del producto es obligatoria").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
    validateFields
];

//validate fields for update product
productVali.validateUpdateProduct = [
    check("id","El id es obligatorio").notEmpty().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistProductById(id);
    }),
    check("name","El nombre del producto es obligatorio").notEmpty(),
    check("amount","La cantidad del producto es obligatoria").notEmpty(),
    check("amount","La cantidad del producto debe ser un numero").isNumeric(),
    check("category","La categoria del producto es obligatoria").notEmpty(),
    check("category").custom(async (category) => {
        await validateExistCategoryById(category);
    }),
    check("mark","La marca del producto es obligatoria").notEmpty(),
    check("mark").custom(async (mark) => {
        await validateExistMarkById(mark);
    }),
    check("description","Descipcion del producto es obligatoria").notEmpty(),
    check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
    validateFields,
];

//validate token 
productVali.validateHeaders =[
    check('token').custom(async (token, {req}) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
      }),
      validateFields,
];
  
export { productVali }