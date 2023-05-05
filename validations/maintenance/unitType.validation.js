import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { unitTypeHelper } from "../../helpers/maintenance/unitType.helper.js";

const { validateExistUnitTypeById } = unitTypeHelper;
const { validateToken,validateFarm } = webToken;

const unitTypesVali = {};

//validate if exist pay
unitTypesVali.validateExistUnitType = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistUnitTypeById(id); // modificar por pay
  }),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for register pay
unitTypesVali.validateRegisterUnitType = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("unittype", "El tipo de unidad es obligatoria").notEmpty(),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for update pay
unitTypesVali.validateUpdateUnitType = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistUnitTypeById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("unittype", "El tipo de unidad es obligatoria").notEmpty(),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate token 
unitTypesVali.validateHeaders =[
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
    validateFields,
]

export { unitTypesVali };
