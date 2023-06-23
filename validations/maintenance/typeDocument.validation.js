import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { typeDocumentHelper } from "../../helpers/maintenance/typeDocument.helper.js";

const { validateExistTypeDocumentById } = typeDocumentHelper;
const { validateToken,validateFarm } = webToken;

const typeDocumentVali = {};
const typeDocument = ["CC", "CE", "TI", "RC", "PAS", "NIT", "NUIP", "TE"];

//validate if exist pay
typeDocumentVali.validateExistTypeDocument = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistTypeDocumentById(id); // modificar por pay
  }),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for register pay
typeDocumentVali.validateRegisterTypeDocument = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("name").custom((name) => {
    if (!typeDocument.includes(name.toUpperCase())) {
      throw new Error("El nombre no es valido");
    }
  }),

  //check("description", "La descripcion es obligatoria").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update pay
typeDocumentVali.validateUpdateTypeDocument = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistTypeDocumentById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("name").custom(async (name) => {
    if (!typeDocument.includes(name.toUpperCase())) {
      throw new Error("El nombre no es valido");
    }
  }),
  //check("description", "La descripcion es obligatoria").notEmpty(),
  check('token').custom(async (token, {req}) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),

  validateFields,
];

//validate token 
typeDocumentVali.validateHeaders = [
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
]

export { typeDocumentVali };
