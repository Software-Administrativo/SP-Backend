import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { activityExpensesHelper } from "../../helpers/costs/activityExpenses.helper.js";

const { validateExistActivityExpensesById, } = activityExpensesHelper;
const { validateToken, validateFarm } = webToken;

const activityExpensesVali = {};

//Validate if exist expenses of activity
activityExpensesVali.validateExistActivityExpensesById = [
  check("id", "El id es obligatorio ").notEmpty(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistActivityExpensesById(id);
  }),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate field for register expenses of activity
activityExpensesVali.validateRegisterActivityExpenses = [
  check("name", "El nombre del gasto de actividades es obligatorio").notEmpty(),
  check("description", "La descripción del gasto de actividades es obligatorio").notEmpty(),
  check("worth", "El valor del gasto de actividades es obligatorio").notEmpty(),
  check("worth", "El valor del gasto de actividades no es valido").isNumeric(),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate field for update expenses of activity 
activityExpensesVali.validateUpdateActivityExpenses = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistActivityExpensesById(id);
  }),
  check("name", "El nombre de la categoria es obligatorio").notEmpty(),
  check("description", "La descripción del gasto de actividades es obligatorio").notEmpty(),
  check("worth", "El valor del gasto de actividades es obligatorio").notEmpty(),
  check("worth", "El valor del gasto de actividades no es valido").isNumeric(),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token 
activityExpensesVali.validateHeaders = [
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];
export { activityExpensesVali }