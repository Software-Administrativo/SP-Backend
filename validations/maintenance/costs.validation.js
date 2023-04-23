import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { costsHelper } from "../../helpers/maintenance/cost.helper.js";

const { validateExistCostById } = costsHelper;

const costsVali = {};

//validate if exist pay
costsVali.validateExistCost = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistCostById(id); // modificar por pay
  }),
  validateFields,
];

//validate fields for register pay
costsVali.validateRegisterCost = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("description", "La descripcion es obligatoria").notEmpty(),
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
  validateFields,
];

export { costsVali };
