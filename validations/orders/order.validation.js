import { check } from "express-validator";
import webToken from "../../middlewares/webToken.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { orderHelper } from "../../helpers/orders/order.helper.js";

const { validateExistOrderById, validateModel } = orderHelper;
const { validateToken, validateFarm } = webToken;

const orderVali = {};

//validate if exist order
orderVali.validateExistOrder = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id, { req }) => {
    await validateExistOrderById(id, req.headers.farm);
  }),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for register order
orderVali.validateRegisterOrder = [
  check("client", "El cliente es obligatorio").notEmpty(),
  check("phone", "El teléfono es obligatorio").notEmpty(),
  check("phone", "El teléfono debe ser un número").isNumeric(),
  check("document", "El documento es obligatorio").notEmpty(),
  check("address", "La dirección es obligatoria").notEmpty(),
  check("models", "El o los modelos son obligatorios").notEmpty(),
  check("models", "El o los modelos deben ser un array").isArray(),
  check("models").custom(async (models, { req }) => {
    for (let i = 0; i < models.length; i++) {
      await validateModel(models[i].id, req.headers.farm);
      if (isNaN(models[i].quantity)) {
        throw new Error(
          `La cantidad del modelo ${models[i].id} debe ser un número`
        );
      }
    }
  }),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate fields for update order
orderVali.validateUpdateOrder = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id, { req }) => {
    await validateExistOrderById(id, req.headers.farm);
  }),
  check("client", "El cliente es obligatorio").notEmpty(),
  check("phone", "El teléfono es obligatorio").notEmpty(),
  check("phone", "El teléfono debe ser un número").isNumeric(),
  check("document", "El documento es obligatorio").notEmpty(),
  check("address", "La dirección es obligatoria").notEmpty(),
  check("models", "El o los modelos son obligatorios").notEmpty(),
  check("models", "El o los modelos deben ser un array").isArray(),
  check("models").custom(async (models) => {
    for (let i = 0; i < models.length; i++) {
      await validateModel(models[i].id, req.headers.farm);
      if (isNaN(models[i].quantity)) {
        throw new Error(
          `La cantidad del modelo ${models[i].id} debe ser un número`
        );
      }
    }
  }),
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

//validate token
orderVali.validateHeaders = [
  check("token").custom(async (token, { req }) => {
    await validateToken(token);
    await validateFarm(req.headers.farm);
  }),
  validateFields,
];

export { orderVali };
