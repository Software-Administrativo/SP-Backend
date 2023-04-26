import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { lotsHelper } from "../../helpers/maintenance/lots.helper.js";

const { validateExistLotById, validateExistLotFatherById } = lotsHelper;
const { validateToken } = webToken;

const lotsVali = {};
const statesLot = [
  "EN DESAROLLO",
  "EN SIEMBRA",
  "POR RECOLECTAR",
  "POR FERTILIZAR",
];
const classLot = ["PADRE", "HIJO", "PADRE-HIJO"];

//validate if exist lot
lotsVali.validateExistLot = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistLotById(id);
  }),
  check("token").custom(async (token) => {
    await validateToken(token);
  }),
  validateFields,
];

//validate fields for register lot
lotsVali.validateRegisterLot = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("areasize", "El tamaño de area es obligatorio").notEmpty(),
  check("areaSize", "El tamaño de area debe ser un numero").isNumeric(),
  check("areaSize", "El tamaño de area debe ser mayor a 0").isFloat({ min: 0 }),
  check("lotestate", "El estado del lote no puede estar vacio").notEmpty(),
  check("lotestate").custom((lotestate) => {
    if (!statesLot.includes(lotestate.toUpperCase())) {
      throw new Error("El estado del lote no es valido");
    }
  }),
  check("classlote", "La clase de lote es obligatoria").notEmpty(),
  check("classlote").custom((classlote) => {
    if (!classLot.includes(classlote.toUpperCase())) {
      throw new Error("El estado del lote no es valido");
    }
  }),

  check("fatherlot").custom(async ({ req }) => {
    if (
      req.body.classlote.toUpperCase() === "HIJO" ||
      req.body.classlote.toUpperCase() === "PADRE-HIJO"
    ) {
      if (req.body.fatherlot.toString().trim() == "") {
        throw new Error("El lote padre es obligatorio");
      }
      await validateExistLotFatherById(req.body.fatherlot);
    }
  }),

  check("sowingdensity", "La densidad de siembra es obligatoria").notEmpty(),
  check(
    "sowingdensity",
    "La densidad de siembra debe ser un numero"
  ).isNumeric(),
  check("sowingdensity", "La densidad de siembra debe ser mayor a 0").isFloat({
    min: 0,
  }),


  check("token").custom(async (token) => {
    await validateToken(token);
  }),

  validateFields,
];

//validate fields for update lot
lotsVali.validateUpdateLot = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistLotById(id); // modificar por pay
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("areasize", "El tamaño de area es obligatorio").notEmpty(),
  check("areaSize", "El tamaño de area debe ser un numero").isNumeric(),
  check("areaSize", "El tamaño de area debe ser mayor a 0").isFloat({ min: 0 }),
  check("lotestate", "El estado del lote no puede estar vacio").notEmpty(),
  check("lotestate").custom((lotestate) => {
    if (!statesLot.includes(lotestate.toUpperCase())) {
      throw new Error("El estado del lote no es valido");
    }
  }),
  check("classlote", "La clase de lote es obligatoria").notEmpty(),
  check("classlote").custom((classlote) => {
    if (!statesLot.includes(classlote.toUpperCase())) {
      throw new Error("El estado del lote no es valido");
    }
  }),

  check("fatherlot").custom(async ({ req }) => {
    if (
      req.body.classlote.toUpperCase() === "HIJO" ||
      req.body.classlote.toUpperCase() === "PADRE-HIJO"
    ) {
      if (req.body.fatherlot.toString().trim() == "") {
        throw new Error("El lote padre es obligatorio");
      }
      await validateExistLotFatherById(req.body.fatherlot);
    }
  }),

  check("sowingdensity", "La densidad de siembra es obligatoria").notEmpty(),
  check(
    "sowingdensity",
    "La densidad de siembra debe ser un numero"
  ).isNumeric(),
  check("sowingdensity", "La densidad de siembra debe ser mayor a 0").isFloat({
    min: 0,
  }),


  check("token").custom(async (token) => {
    await validateToken(token);
  }),
  validateFields,
];

//validate token
lotsVali.validateToken = [
  check("token").custom(async (token) => {
    await validateToken(token);
  }),
  validateFields,
];

export { lotsVali };
