import { Router } from "express";
import { unitTypesCtrl } from "../../controller/maintenance/unitType.controller.js";
import { unitTypesVali } from "../../validations/maintenance/unitType.validation.js";

const { validateExistUnitType, validateRegisterUnitType, validateUpdateUnitType,validateHeaders } =
  unitTypesVali;

const {
    getUnitTypesId,
  getUnitTypes,
  registerUnitTypes,
  updateUnitTypes,
  activeUnitTypes,
  inactiveUnitTypes,
} = unitTypesCtrl;

const routerUnitTypes = Router();

routerUnitTypes.get("/:id", validateExistUnitType, getUnitTypesId);
routerUnitTypes.get("/", validateHeaders,getUnitTypes);
routerUnitTypes.post("/register", validateRegisterUnitType, registerUnitTypes);
routerUnitTypes.put("/active/:id", validateExistUnitType, activeUnitTypes);
routerUnitTypes.put("/inactive/:id", validateExistUnitType, inactiveUnitTypes);
routerUnitTypes.put("/update/:id", validateUpdateUnitType, updateUnitTypes);

export { routerUnitTypes };
