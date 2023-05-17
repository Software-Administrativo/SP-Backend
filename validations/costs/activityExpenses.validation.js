import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { activityExpensesHelper } from "../../helpers/costs/activityExpenses.helper.js";

const { validateExistActivityExpensesById, } = activityExpensesHelper;
const { validateToken, validateFarm } = webToken;

const activityExpensesVali = {};

 //Validate if exist expenses of activity
 activityExpensesVali.validateExistActivityExpensesById = [
  check("id","El id es obligatorio ").notEmpty().exists(),
  check("id","El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
      await validateExistActivityExpensesById(id);
  }),
  check('token').custom(async (token, {req}) => {
  await validateToken(token);
  await validateFarm(req.headers.farm);
}),
  validateFields,
];

//validate field for register expenses of activity
activityExpensesVali.validateRegisterActivityExpenses = [
  check("name","El nombre del gasto de actividades es obligatorio").notEmpty(),
  check('token').custom(async (token, {req}) => {
  await validateToken(token);
  await validateFarm(req.headers.farm);
}),
  validateFields,
];

//validate field for update expenses of activity 
activityExpensesVali.validateUpdateActivityExpenses = [
  check("id","El id es obligatorio").notEmpty().exists(),
  check("id","El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
      await validateExistActivityExpensesById(id);
  }),
  check("name","El nombre de la categoria es obligatorio").notEmpty().isString(),
 // check("descripcion","Descripcion de la categoria es obligatoria").notEmpty().isString(),
 check('token').custom(async (token, {req}) => {
  await validateToken(token);
  await validateFarm(req.headers.farm);
}),
  validateFields,
];

//validate token 
activityExpensesVali.validateHeaders =[
  check('token').custom(async (token, {req}) => {
      await validateToken(token);
      await validateFarm(req.headers.farm);
    }),
    validateFields,
];
export { activityExpensesVali }