import { Router } from "express";
import { worksCtrl } from "../../controller/maintenance/works.controller.js";
import { worksVali } from "../../validations/maintenance/works.validation.js";

const { validateExistWork, validateRegisterWork, validateUpdateWork,validateHeaders } =
  worksVali;

const {
  getWorkId,
  getWorks,
  registerWork,
  updateWorks,
  activeWorks,
  inactiveWorks,
} = worksCtrl;

const routerWorks = Router();

routerWorks.get("/:id", validateExistWork, getWorkId);
routerWorks.get("/",validateHeaders, getWorks);
routerWorks.post("/register", validateRegisterWork, registerWork);
routerWorks.put("/active/:id", validateExistWork, activeWorks);
routerWorks.put("/inactive/:id", validateExistWork, inactiveWorks);
routerWorks.put("/update/:id", validateUpdateWork, updateWorks);

export { routerWorks };
