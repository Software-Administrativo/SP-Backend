import { Router } from "express";
import { orderCtrl } from "../../controller/orders/order.controller.js";
import { orderVali } from "../../validations/orders/order.validation.js";

const {
  validateExistOrder,
  validateRegisterOrder,
  validateUpdateOrder,
  validateHeaders,
} = orderVali;

const {
  getOrderId,
  getOrders,
  registerOrder,
  updateOrders,
  payOrder,
  activeOrders,
  inactiveOrders,
  deliverOrder,
} = orderCtrl;

const routerOrder = Router();

routerOrder.get("/:id", validateExistOrder, getOrderId);
routerOrder.get("/", validateHeaders, getOrders);
routerOrder.post("/register", validateRegisterOrder, registerOrder);
routerOrder.put("/pay/:id", validateExistOrder, payOrder);
routerOrder.put("/deliver/:id", validateExistOrder, deliverOrder);
routerOrder.put("/active/:id", validateExistOrder, activeOrders);
routerOrder.put("/inactive/:id", validateExistOrder, inactiveOrders);
routerOrder.put("/update/:id", validateUpdateOrder, updateOrders);

export { routerOrder };
