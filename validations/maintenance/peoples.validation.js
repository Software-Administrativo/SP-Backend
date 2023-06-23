import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { peoplesHelper } from "../../helpers/maintenance/peoples.helper.js";

const { validateExistPeopleById, validateExistDocument,validateExistNumber, validateExistEpsById } = peoplesHelper;
const { validateToken, validateFarm } = webToken;

const peoplesVali = {};
const typeDocument = ["CC", "CE", "NIT", "NIP", "NUIP", "PA", "CC", "CE", "NIT", "NIP", "NUIP", "PA"];
const typePeople = ["TRABAJADOR", "ADMINISTRADOR"];

//validate if exist people
peoplesVali.validateExistPeople = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistPeopleById(id);
    }),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
];

//validate fields for register people
peoplesVali.validateRegisterPeople = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("tpdct", "El tipo de documento es obligatorio").notEmpty(),
    check("tpdct", "El tipo de documento no es valido").isIn(typeDocument),
    check("document", "El documento es obligatorio").notEmpty(),
    check("document").custom(async (document, { req }) => {
        await validateExistDocument(document, req.headers.farm);
    }),
    check("phone", "El telefono es obligatorio").notEmpty(),
    check("phone", "El telefono no es valido").isNumeric(),
    check("phone", "El telefono debe tener 10 digitos").isLength({ min: 10, max: 15 }),
    check("phone").custom(async (phone, { req }) => {
        await validateExistNumber(phone, req.headers.farm);
    }),
    check("eps", "La eps es obligatoria").notEmpty(),
    check("eps").custom(async (eps) => {
        await validateExistEpsById(eps);
    }),
    check("typePeople", "El tipo de persona es obligatorio").notEmpty(),
    check("typePeople", "El tipo de persona no es valido").isIn(typePeople),
    check('token').custom(async (token, { req }) => {
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
    check("tpdct", "El tipo de documento no es valido").isIn(typeDocument),
    check("document", "El documento es obligatorio").notEmpty(),
    check("document").custom(async (document, { req }) => {
        await validateExistDocument(document, req.headers.farm, req.params.id);
    }),
    check("phone", "El telefono es obligatorio").notEmpty(),
    check("phone", "El telefono no es valido").isNumeric(),
    check("phone", "El telefono debe tener 10 digitos").isLength({ min: 10, max: 15 }),
    check("phone").custom(async (phone, { req }) => {
        await validateExistNumber(phone, req.headers.farm, req.params.id);
    }),
    check("eps", "La eps es obligatoria").notEmpty(),
    check("eps").custom(async (eps) => {
        await validateExistEpsById(eps);
    }),
    check("typePeople", "El tipo de persona es obligatorio").notEmpty(),
    check("typePeople", "El tipo de persona no es valido").isIn(typePeople),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
];

//validate token 
peoplesVali.validateHeaders = [
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
]
export { peoplesVali };
