import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { typeExpensesHelper } from "../../helpers/costs/typeExpenses.helper.js";

const { validateExistTypeExpensesById } = typeExpensesHelper;
const { validateToken, validateFarm } = webToken;

const typeExpensesVali = {};

//validate if exists create type expenses
typeExpensesVali.validateExistTypeExpensesById = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es vaalido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistTypeExpensesById(id);
  }),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//Validate fields for register create type expenses 
typeExpensesVali.validateRegisterTypeExpenses = [
  check("name","El nombre para la creación del tipo de gasto es obligatorio").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update create type expenses 
typeExpensesVali.validateUpdateTypeExpenses = [
  check("id","El id es obligatorio").notEmpty().exists(),
  check("id","El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
      await validateExistTypeExpensesById(id);
  }),
  check("name","El nombre para la creación del tipo de gasto es obligatorio").notEmpty().isString(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token 
typeExpensesVali.validateToken =[
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
];
export { typeExpensesVali }