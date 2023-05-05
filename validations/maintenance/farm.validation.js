import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { farmHelper } from "../../helpers/maintenance/farm.helper.js";

const { validateExistFarmById } = farmHelper;
const { validateToken,validateFarm } = webToken;

const farmVali = {};

//validate if exist farm
farmVali.validateExistFarm = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistFarmById(id);
  }),
  check("token").custom(async (token) => {
    await validateToken(token);
  }),
  validateFields,
];

//validate fields for register farm
farmVali.validateRegisterFarm = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("address", "La dirección es obligatoria").notEmpty(),
  check("owner", "El propietario es obligatorio").notEmpty(),

  check("token").custom(async (token) => {
    await validateToken(token);
  }),
  validateFields,
];

//validate fields for update farm
farmVali.validateUpdateFarm = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistFarmById(id);
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("address", "La dirección es obligatoria").notEmpty(),
  check("owner", "El propietario es obligatorio").notEmpty(),

  check("token").custom(async (token) => {
    await validateToken(token);
  }),

  validateFields,
];

//validate token
farmVali.validateHeaders =[
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
    validateFields,
]

export { farmVali };
