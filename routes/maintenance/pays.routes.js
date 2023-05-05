import { Router } from "express";
import { paysCtrl } from "../../controller/maintenance/pays.controller.js";
import { paysVali } from "../../validations/maintenance/pays.validation.js";

const { validateExistPay, validateRegisterPay, validateUpdatePay,validateHeaders } = paysVali;

const { getPayId, getPays, registerPay, updatePays, activePays, inactivePays } =
  paysCtrl;

const routerPays = Router();

routerPays.get("/:id", validateExistPay, getPayId);
routerPays.get("/",validateHeaders, getPays);
routerPays.post("/register", validateRegisterPay, registerPay);
routerPays.put("/active/:id", validateExistPay, activePays);
routerPays.put("/inactive/:id", validateExistPay, inactivePays);
routerPays.put("/update/:id", validateUpdatePay, updatePays);

export { routerPays };
