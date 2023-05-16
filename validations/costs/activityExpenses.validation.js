import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { activityExpensesHelper } from "../../helpers/costs/activityExpenses.helper.js";

const { validateExistActivityExpensesById, } = categoryHelper;
const { validateToken, validateFarm } = webToken;

const activityExpensesVali = {};

 //Validate if exist category
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