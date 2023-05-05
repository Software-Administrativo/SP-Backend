import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { worksHelper } from "../../helpers/maintenance/work.helper.js";

const { validateExistWorkById } = worksHelper;
const { validateToken } = webToken;

const worksVali = {};

//validate if exist pay
worksVali.validateExistWork = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistWorkById(id); // modificar por pay
  }),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for register pay
worksVali.validateRegisterWork = [
  check("name", "El nombre es obligatorio").notEmpty(),
  //check("description", "La descripcion es obligatoria").notEmpty(),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for update pay
worksVali.validateUpdateWork = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistWorkById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  //check("description", "La descripcion es obligatoria").notEmpty(),
  validateFields,
];

//validate token 
worksVali.validateToken =[
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
    validateFields,
]

export { worksVali };
