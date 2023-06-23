import { Router } from "express";
import { stagesCtrl } from "../../controller/maintenance/stages.controller.js";
import { stagesVali } from "../../validations/maintenance/stage.validation.js";

const { 
    validateExistStage, 
    validateRegisterStage, 
    validateUpdateStage,
    validateHeaders } =
stagesVali;

const {
  getStageId,
  getStages,
  registerStage,
  updateStages,
  activeStages,
  inactiveStages,
} = stagesCtrl;

const routerStages = Router();

routerStages.get("/:id", validateExistStage, getStageId);
routerStages.get("/",validateHeaders, getStages);
routerStages.post("/register", validateRegisterStage, registerStage);
routerStages.put("/active/:id", validateExistStage, activeStages);
routerStages.put("/inactive/:id", validateExistStage, inactiveStages);
routerStages.put("/update/:id", validateUpdateStage, updateStages);

export { routerStages };
