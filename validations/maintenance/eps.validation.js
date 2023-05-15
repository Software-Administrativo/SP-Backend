import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { epsHelper } from "../../helpers/maintenance/eps.helper.js";

const { validateExistEpsById } = epsHelper;
const { validateToken,validateFarm } = webToken;

const epsVali = {};

//validate if exist Eps
epsVali.validateExistEps = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistEpsById(id); // modificar por Eps
  }),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for register Eps
epsVali.validateRegisterEps = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update Eps
epsVali.validateUpdateEps = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistEpsById(id); // modificar por Eps
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token 
epsVali.validateHeaders =[
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
    validateFields,
]


export { epsVali };
