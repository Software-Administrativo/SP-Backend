import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { unitTypeHelper } from "../../helpers/maintenance/unitType.helper.js";

const { validateExistUnitTypeById } = unitTypeHelper;

const unitTypesVali = {};

//validate if exist pay
unitTypesVali.validateExistUnitType = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistUnitTypeById(id); // modificar por pay
  }),
  validateFields,
];

//validate fields for register pay
unitTypesVali.validateRegisterUnitType = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("unittype", "El tipo de unidad es obligatoria").notEmpty(),
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
  validateFields,
];

export { unitTypesVali };
