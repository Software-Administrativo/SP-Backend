import { Router } from "express";
import { epsCtrl } from "../../controller/maintenance/eps.controller.js";
import { epsVali } from "../../validations/maintenance/eps.validation.js";

const { validateExistEps, validateRegisterEps, validateUpdateEps,validateHeaders } = epsVali;

const { getEpsId, getEps, registerEps, updateEps, activeEps, inactiveEps } =
epsCtrl;

const routerEps = Router();

routerEps.get("/:id", validateExistEps, getEpsId);
routerEps.get("/",validateHeaders, getEps);
routerEps.post("/register", validateRegisterEps, registerEps);
routerEps.put("/active/:id", validateExistEps, activeEps);
routerEps.put("/inactive/:id", validateExistEps, inactiveEps);
routerEps.put("/update/:id", validateUpdateEps, updateEps);

export { routerEps };
