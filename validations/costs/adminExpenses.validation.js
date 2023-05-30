import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { adminExpensesHelper } from "../../helpers/costs/adminExpenses.helper.js";

const { validateExistAdminExpensesById, } = adminExpensesHelper;
const { validateToken, validateFarm } = webToken;
const adminExpensesVali = {};

//Validate if exist expenses of administration 
adminExpensesVali.validateExistAdminExpensesById = [
  check("id", "El id es obligatorio ").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistAdminExpensesById(id);
  }),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//Validate fields for register expenses of administration 
adminExpensesVali.validateRegisterAdminExpenses = [
  check("name", "El nombre del gasto de actividades es obligatorio").notEmpty(),
  check("description", "La descripción del gasto de actividades es obligatorio").notEmpty(),
  check("cost", "El valor del gasto de actividades es obligatorio").notEmpty(),
  check("cost", "El valor del gasto de actividades no es valido").isNumeric(),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update expenses of activity
adminExpensesVali.validateUpdateAdminExpenses = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistAdminExpensesById(id);
  }),
  check("name", "El nombre del gasto de actividades es obligatorio").notEmpty(),
  check("description", "La descripción del gasto de actividades es obligatorio").notEmpty(),
  check("cost", "El valor del gasto de actividades es obligatorio").notEmpty(),
  check("cost", "El valor del gasto de actividades no es valido").isNumeric(),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token 
adminExpensesVali.validateHeaders = [
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];
export { adminExpensesVali }