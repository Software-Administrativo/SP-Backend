import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { peoplesHelper } from "../../helpers/maintenance/peoples.helper.js";

const { validateExistPeopleById, validateExistTypeDocumentById, validateExistEpsById } = peoplesHelper;
const { validateToken,validateFarm } = webToken;

const peoplesVali = {};

//validate if exist people
peoplesVali.validateExistPeople = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistPeopleById(id);
    }),
    check('token').custom(async ({r}) => {
        await validateToken(token);
    }),
    validateFields,
];

//validate fields for register people
peoplesVali.validateRegisterPeople = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("tpdct", "El tipo de documento es obligatorio").notEmpty(),
    check("tpdct", "El tipo de documento no es valido").isMongoId(),
    check("tpdct").custom(async (tpdct) => {
        await validateExistTypeDocumentById(tpdct);
    }),
    check("document", "El documento es obligatorio").notEmpty(),
    check("eps", "La eps es obligatoria").notEmpty(),
    check("eps").custom(async (eps) => {
        await validateExistEpsById(eps);
    }),
    check("tipePeople", "El tipo de persona es obligatorio").notEmpty(),
    check('token').custom(async (token, {req}) => {
      await validateToken(token);
      await validateFarm(req.headers.farm);
    }),
    validateFields,
];

//validate fields for update pay
peoplesVali.validateUpdatePeople = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistPeopleById(id); // modificar por pay
    }),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("tpdct", "El tipo de documento es obligatorio").notEmpty(),
    check("tpdct", "El tipo de documento no es valido").isMongoId(),
    check("tpdct").custom(async (tpdct) => {
        await validateExistTypeDocumentById(tpdct);
    }),
    check("document", "El documento es obligatorio").notEmpty(),
    check("eps", "La eps es obligatoria").notEmpty(),
    check("eps").custom(async (eps) => {
        await validateExistEpsById(eps);
    }),
    check("tipePeople", "El tipo de persona es obligatorio").notEmpty(),
    check('token').custom(async (token, {req}) => {
      await validateToken(token);
      await validateFarm(req.headers.farm);
    }),
    validateFields,
];

//validate token 
peoplesVali.validateHeaders =[
    check('token').custom(async (token, {req}) => {
      await validateToken(token);
      await validateFarm(req.headers.farm);
    }),
      validateFields,
  ]
export { peoplesVali };
