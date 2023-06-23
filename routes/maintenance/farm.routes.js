import { Router } from "express";
import { farmCtrl } from "../../controller/maintenance/farm.controller.js";
import { farmVali } from "../../validations/maintenance/farm.validation.js";

const { validateExistFarm, validateRegisterFarm, validateUpdateFarm,validateHeaders } = farmVali;

const { getFarmId, getFarms, registerFarm, updateFarms, activeFarms, inactiveFarms } =
farmCtrl;

const routerFarm = Router();

routerFarm.get("/:id", validateExistFarm, getFarmId);
routerFarm.get("/",validateHeaders, getFarms);
routerFarm.post("/register", validateRegisterFarm, registerFarm);
routerFarm.put("/active/:id", validateExistFarm, activeFarms);
routerFarm.put("/inactive/:id", validateExistFarm, inactiveFarms);
routerFarm.put("/update/:id", validateUpdateFarm, updateFarms);

export { routerFarm };
