import { Router } from "express";
import { modelTransCtrl } from "../../controller/transformation/modelTrans.controller.js";
import { modelTransVali } from "../../validations/transformation/modelTrans.validation.js";

const { validateExistModelTrans, validateRegisterModelTrans, validateUpdateModelTrans,validateHeaders } = modelTransVali;

const { getModelTransId, getModelTrans, registerModelTrans, updateModelTrans, activeModelTrans, inactiveModelTrans } = modelTransCtrl;

const routerModelTrans = Router();

routerModelTrans.get("/:id", validateExistModelTrans, getModelTransId);
routerModelTrans.get("/",validateHeaders, getModelTrans);
routerModelTrans.post("/register", validateRegisterModelTrans, registerModelTrans);
routerModelTrans.put("/active/:id", validateExistModelTrans, activeModelTrans);
routerModelTrans.put("/inactive/:id", validateExistModelTrans, inactiveModelTrans);
routerModelTrans.put("/update/:id", validateUpdateModelTrans, updateModelTrans);

export { routerModelTrans };
