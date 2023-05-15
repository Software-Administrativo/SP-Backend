import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { paysHelper } from "../../helpers/maintenance/pay.helper.js";
import { validate } from "uuid";

const { validateExistPayById } = paysHelper;
const { validateToken, validateFarm } = webToken;

const paysVali = {};

//validate if exist pay
paysVali.validateExistPay = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistPayById(id); // modificar por pay
  }),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for register pay
paysVali.validateRegisterPay = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update pay
paysVali.validateUpdatePay = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistPayById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token
paysVali.validateHeaders = [
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

export { paysVali };
