import { Router } from "express";
import { costsCtrl } from "../../controller/maintenance/costs.controller.js";
import { costsVali } from "../../validations/maintenance/costs.validation.js";

const { validateExistCost, validateRegisterCost, validateUpdateCost } =
  costsVali;

const {
  getCostId,
  getCosts,
  registerCost,
  updateCosts,
  activeCosts,
  inactiveCosts,
} = costsCtrl;

const routerCosts = Router();

routerCosts.get("/:id", validateExistCost, getCostId);
routerCosts.get("/", getCosts);
routerCosts.post("/register", validateRegisterCost, registerCost);
routerCosts.put("/active/:id", validateExistCost, activeCosts);
routerCosts.put("/inactive/:id", validateExistCost, inactiveCosts);
routerCosts.put("/update/:id", validateUpdateCost, updateCosts);

export { routerCosts };
