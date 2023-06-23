import { Router } from "express";
import { spentCtrl } from "../../controller/maintenance/spents.controller.js";
import { spentsVali } from "../../validations/maintenance/spents.validation.js";

const { validateExistSpent, validateRegisterSpent, validateUpdateSpent,validateHeaders } =
spentsVali;

const {
  getSpentId,
  getSpents,
  registerSpent,
  updateSpents,
  activeSpents,
  inactiveSpents,
} = spentCtrl;

const routerSpents = Router();

routerSpents.get("/:id", validateExistSpent, getSpentId);
routerSpents.get("/",validateHeaders, getSpents);
routerSpents.post("/register", validateRegisterSpent, registerSpent);
routerSpents.put("/active/:id", validateExistSpent, activeSpents);
routerSpents.put("/inactive/:id", validateExistSpent, inactiveSpents);
routerSpents.put("/update/:id", validateUpdateSpent, updateSpents);

export { routerSpents };
