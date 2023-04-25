import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { costsHelper } from "../../helpers/maintenance/cost.helper.js";

const { validateExistCostById } = costsHelper;
const { validateToken } = webToken;

const costsVali = {};

//validate if exist pay
costsVali.validateExistCost = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistCostById(id); // modificar por pay
  }),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for register pay
costsVali.validateRegisterCost = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("description", "La descripcion es obligatoria").notEmpty(),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for update pay
costsVali.validateUpdateCost = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistCostById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("description", "La descripcion es obligatoria").notEmpty(),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate token 
costsVali.validateToken =[
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
]

export { costsVali };
