import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { stagesHelper } from "../../helpers/maintenance/stages.helper.js";

const { validateExistStageById, validateExistLotById } = stagesHelper;
const { validateToken } = webToken;

const stagesVali = {};

//validate if exist Stage
stagesVali.validateExistStage = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistStageById(id);
    }),
    check('token').custom(async (token) => {
        await validateToken(token);
    }),
    validateFields,
];

//validate fields for register Stage
stagesVali.validateRegisterStage = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("lot", "El lote es obligatorio").notEmpty().exists(),
    check("lot", "El lote no es valido").isMongoId(),
    check("lot").custom(async (lot) => {
        await validateExistLotById(lot);
    }),
    check('token').custom(async (token) => {
        await validateToken(token);
    }),
    validateFields,
];

//validate fields for update Stage
stagesVali.validateUpdateStage = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistStageById(id);
    }),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("lot", "El lote es obligatorio").notEmpty().exists(),
    check("lot", "El lote no es valido").isMongoId(),
    check("lot").custom(async (lot) => {
        await validateExistLotById(lot);
    }),
    check('token').custom(async (token) => {
        await validateToken(token);
    }),
    validateFields,
];

//validate token 
stagesVali.validateToken = [
    check('token').custom(async (token) => {
        await validateToken(token);
    }),
    validateFields,
]

export { stagesVali };
