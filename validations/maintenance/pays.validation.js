import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { paysHelper } from "../../helpers/maintenance/pay.helper.js";

const { validateExistPayById } = paysHelper;

const paysVali = {};

//validate if exist pay
paysVali.validateExistPay = [
  check("id", "El id es obligatorio").notEmpty().isString().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistPayById(id); // modificar por pay
  }),
  validateFields,
];

//validate fields for register pay
paysVali.validateRegisterPay = [
  check("name", "El nombre es obligatorio").notEmpty().isString(),
  check("tpcontrato", "El tipo de documento es obligatorio")
    .notEmpty()
    .isString(),
  check("valor", "El rol es obligatorio").notEmpty().isNumeric(),
  validateFields,
];

//validate fields for update pay
paysVali.validateUpdatePay = [
  check("id", "El id es obligatorio").notEmpty().isString().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistPayById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty().isString(),
  check("tpcontrato", "El tipo de documento es obligatorio")
    .notEmpty()
    .isString(),
  check("valor", "El rol es obligatorio").notEmpty().isNumeric(),
  validateFields,
];

export { paysVali };
