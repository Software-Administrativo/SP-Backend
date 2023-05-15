import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { spentsHelper } from "../../helpers/maintenance/spents.helper.js";

const { validateExistSpendById } = spentsHelper;
const { validateToken,validateFarm } = webToken;

const spentsVali = {};

//validate if exist pay
spentsVali.validateExistSpent = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistSpendById(id); // modificar por pay
  }),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for register pay
spentsVali.validateRegisterSpent = [
  check("name", "El nombre es obligatorio").notEmpty(),
  //check("description", "La descripcion es obligatoria").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update pay
spentsVali.validateUpdateSpent = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistSpendById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  //check("description", "La descripcion es obligatoria").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token 
spentsVali.validateHeaders =[
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
    validateFields,
]

export { spentsVali };
