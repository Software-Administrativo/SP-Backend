import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { modelTransHelper } from "../../helpers/transformation/modelTrans.helper.js";

const { validateExistModelTransById } = modelTransHelper;
const { validateToken, validateFarm } = webToken;

const modelTransVali = {};

//validate if exist model of transformation by id
modelTransVali.validateExistModelTrans = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistModelTransById(id);
    }),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate fields for register model of transformation
modelTransVali.validateRegisterModelTrans = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("description", "La descripción es obligatoria").notEmpty(),
    check("unitvalue", "El valor unitario es obligatorio").notEmpty(),
    check("unitvalue", "El valor unitario debe ser un número").isNumeric(),

    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate fields for update model of transformation
modelTransVali.validateUpdateModelTrans = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistModelTransById(id);
    }),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("description", "La descripción es obligatoria").notEmpty(),
    check("unitvalue", "El valor unitario es obligatorio").notEmpty(),
    check("unitvalue", "El valor unitario debe ser un número").isNumeric(),

    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate token
modelTransVali.validateHeaders = [
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
]

export { modelTransVali };
