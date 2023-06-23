import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { markHelper } from "../../helpers/inventory/mark.helper.js";

const { validateExistMarkById,validateExistCategoryById } = markHelper;
const { validateToken, validateFarm } = webToken;

const markVali = {}

//Validate if exist mark 
markVali.validateExistMarkById = [
  check("id", "El id es obligatorio ").notEmpty(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistMarkById(id);
  }),
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//Validate fields for register mark 
markVali.validateRegisterMark = [
  check("name", "El nombre de la marca es obligatorio").notEmpty(),
  check("description", "Descipcion de la marca es obligatoria").notEmpty(),
  check("category", "La categoria es obligatoria").notEmpty(),
  check("category", "La categoria no es valida").isMongoId(),
  check("category").custom(async (category, { req }) => {
    await validateExistCategoryById(category, req.headers.farm);
  }),

  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields
];

//validate fields for update mark
markVali.validateUpdateMark = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistMarkById(id);
  }),
  check("name", "El nombre de la marca es obligatorio").notEmpty(),
  check("description", "Descipcion de la marca es obligatoria").notEmpty(),
  check("category", "La categoria es obligatoria").notEmpty(),
  check("category", "La categoria no es valida").isMongoId(),
  check("category").custom(async (category, { req }) => {
    await validateExistCategoryById(category, req.headers.farm);
  }),

  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token 
markVali.validateHeaders = [
  check('token').custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];
export { markVali }