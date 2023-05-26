import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { costTransHelper } from "../../helpers/transformation/costTrans.helper.js";

const { validateExistCostTransById,validateExistLotById } = costTransHelper;
const { validateToken, validateFarm } = webToken;

const costTransVali = {};

//validate if exist model of transformation by id
costTransVali.validateExistCostTrans = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistCostTransById(id);
    }),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate fields for register model of transformation
costTransVali.validateRegisterCostTrans = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("lot", "El lote es obligatorio").notEmpty(),
    check("lot", "El lote debe ser un id valido").isMongoId(),
    check("lot").custom(async (lot) => {
        await validateExistLotById(lot);
    }),
    check("description", "La descripción es obligatoria").notEmpty(),
    check("cost", "El costo es obligatorio").notEmpty(),
    check("cost", "El costo debe ser un número").isNumeric(),

    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate fields for update model of transformation
costTransVali.validateUpdateCostTrans = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistCostTransById(id);
    }),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("lot", "El lote es obligatorio").notEmpty(),
    check("lot", "El lote debe ser un id valido").isMongoId(),
    check("lot").custom(async (lot) => {
        await validateExistLotById(lot);
    }),
    check("description", "La descripción es obligatoria").notEmpty(),
    check("cost", "El costo es obligatorio").notEmpty(),
    check("cost", "El costo debe ser un número").isNumeric(),

    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate token
costTransVali.validateHeaders = [
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
]

export { costTransVali };
