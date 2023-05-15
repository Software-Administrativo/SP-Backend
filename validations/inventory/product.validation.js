import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { productHelper } from "../../helpers/inventory/product.helper.js";

const { validateExistProductById, } = productHelper;
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
    check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
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
    //check("descripcion","Descipcion del producto es obligatoria").notEmpty().isString(),
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