import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { orderHelper } from "../../helpers/orders/order.helper.js";

const { validateExistOrderById } = orderHelper;
const { validateToken, validateFarm } = webToken;

const orderVali = {};

//validate if exist order
orderVali.validateExistOrder = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistOrderById(id);
    }),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate fields for register order
orderVali.validateRegisterOrder = [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("address", "La dirección es obligatoria").notEmpty(),
    check("model", "El o los modelos son obligatorios").notEmpty(),

    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate fields for update order
orderVali.validateUpdateOrder = [
    check("id", "El id es obligatorio").notEmpty().exists(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistOrderById(id);
    }),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("address", "La dirección es obligatoria").notEmpty(),
    check("model.*.name", "El nombre del modelo es obligatorio").notEmpty(),
    check("model.*.price", "El precio del modelo es obligatorio").notEmpty(),
    check("model.*.price", "El precio del modelo debe ser un número").isNumeric(),
    check("model.*.quantity", "La cantidad del modelo es obligatoria").notEmpty(),
    check("model.*.quantity", "La cantidad del modelo debe ser un número").isNumeric(),
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }), validateFields,
];

//validate token
orderVali.validateHeaders = [
    check('token').custom(async (token, { req }) => {
        await validateToken(token);
        await validateFarm(req.headers.farm);
    }),
    validateFields,
]

export { orderVali };
