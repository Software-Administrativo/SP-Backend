import { Router } from "express";
import { costsCtrl } from "../../controller/costs/costsPlanting.controller.js";
import { costsVali } from "../../validations/costs/costsPlanting.validation.js";

const {
  validateExistCostsById,
  validateRegisterCosts,
  validateUpdateCosts,
  validateToken
} = costsVali;

const { 
  getCosts,
  getCostsId,
  registerCosts,
  updateCost,
  activateCosts,
  inactivateCosts
} = costsCtrl;

const routerCosts = Router();

routerCosts.get("/:id",validateExistCostsById, getCostsId);
routerCosts.get("/", validateToken, getCosts);
routerCosts.post("/register", validateRegisterCosts, registerCosts);
routerCosts.put("/activate/:id", validateExistCostsById, activateCosts);
routerCosts.put("/inactivate/:id", validateExistCostsById, inactivateCosts);
routerCosts.put("/update/:id", validateUpdateCosts, updateCost);

export { routerCosts}