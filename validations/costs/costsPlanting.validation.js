import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { costsHelper } from "../../helpers/costs/costsPlanting.helper.js";

const { validateExistCostsById,validateExistLotById } = costsHelper;
const { validateToken, validateFarm } = webToken;

const costsVali = {};

//Validate if exists costs 
costsVali.validateExistCostsById = [
  check("id", "El id es obligatorio ").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistCostsById(id);
  }),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//Validate fields for register costs 
costsVali.validateRegisterCosts = [
  check("name", "El nombre del gasto de actividades es obligatorio").notEmpty(),
  check("description", "La descripción del gasto de actividades es obligatorio").notEmpty(),
  check("lot", "El lote es obligatorio").notEmpty(),
  check("lot", "El lote no es valido").isMongoId(),
  check("lot").custom(async (lot) => {
    await validateExistLotById(lot);
  }),
  check("cost", "El valor del gasto de actividades es obligatorio").notEmpty(),
  check("cost", "El valor del gasto de actividades no es valido").isNumeric(),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update costs
costsVali.validateUpdateCosts = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistCostsById(id);
  }),
  check("name", "El nombre del gasto de actividades es obligatorio").notEmpty(),
  check("description", "La descripción del gasto de actividades es obligatorio").notEmpty(),
  check("lot", "El lote es obligatorio").notEmpty(),
  check("lot", "El lote no es valido").isMongoId(),
  check("lot").custom(async (lot) => {
    await validateExistLotById(lot);
  }),
  check("cost", "El valor del gasto de actividades es obligatorio").notEmpty(),
  check("cost", "El valor del gasto de actividades no es valido").isNumeric(),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token 
costsVali.validateToken = [
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
];
export { costsVali }