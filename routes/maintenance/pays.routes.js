import { Router } from "express";
import { paysCtrl } from "../../controller/maintenance/pays.controller.js";
import { paysVali } from "../../validations/maintenance/pays.validation.js";

const { validateExistPay, validateRegisterPay, validateUpdatePay } = paysVali;

const {
  getPayId,
  getPays,
  registerPay,
  updatePays,
  activatePays,
  inactivePays,
} = paysCtrl;

const routerPays = Router();

routerPays.get("/:id", validateExistPay, getPayId);
routerPays.get("/", getPays);
routerPays.post("/register", validateRegisterPay, registerPay);
routerPays.put("/active/:id", validateExistPay, activatePays);
routerPays.put("/inactive/:id", validateExistPay, inactivePays);
routerPays.put("/update/:id", validateUpdatePay, updatePays);

export { routerPays };
