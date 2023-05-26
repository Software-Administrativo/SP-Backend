import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { clientHelper } from "../../helpers/maintenance/client.helper.js";

const { validateExistClientById, validateUniquePhone, validateUniqueDocument } = clientHelper;
const { validateToken, validateFarm } = webToken;

const clientVali = {};

//validate if exist Client
clientVali.validateExistClient = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistClientById(id);
    }),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
];


//validate fields for register Client
clientVali.validateRegisterClient = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("phone", "El telefono es obligatorio").notEmpty(),
    check("phone").custom(async (phone, { req }) => {
        await validateUniquePhone(phone,null,req.params.farm);
    }),

    check("address", "La direccion es obligatoria").notEmpty(),
    check("document", "El documento es obligatorio").notEmpty(),
    check("document", "El documento es muy corto").isLength({ min: 7 }),
    check("document").custom(async (document, { req }) => {
        await validateUniqueDocument(document, null, req.params.farm);
    }),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
];

//validate fields for update Client
clientVali.validateUpdateClient = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistClientById(id);
    }),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("phone", "El telefono es obligatorio").notEmpty(),
    check("phone").custom(async (phone, { req }) => {
        await validateUniquePhone(phone, req.params.id, req.params.farm);
    }),

    check("address", "La direccion es obligatoria").notEmpty(),
    check("document", "El documento es obligatorio").notEmpty(),
    check("document", "El documento es muy corto").isLength({ min: 7 }),
    check("document").custom(async (document, { req }) => {
        await validateUniqueDocument(document, req.params.id, req.params.farm);
    }),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
];

//validate token 
clientVali.validateHeaders = [
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
]

export { clientVali };
