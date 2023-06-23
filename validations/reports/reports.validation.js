import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";

const { validateToken, validateFarm } = webToken;
const reportVali = {};

reportVali.validateOrdersYear = [
  check("year", "El año es obligatorio").notEmpty(),
  check("year", "El año debe ser un número").isNumeric(),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

reportVali.validateReportYearMonth = [
  check("fstart", "La fecha de inicio es obligatoria").notEmpty(),
  check("fend", "La fecha de fin es obligatoria").notEmpty(),
  check("fstart", "La fecha inicial es invalida").isDate(),
  check("fend", "La fecha final es invalida").isDate(),
  check("fstart").custom((value, { req }) => {
      let fStart = new Date(value);
      let fEnd = new Date(req.body.fend);
      if (fStart > fEnd) {
        throw new Error("La fecha inicial debe ser menor a la fecha final");
      }else{
        return true;
      }
  }),

  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];


reportVali.validateToken = [
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];


export { reportVali };
