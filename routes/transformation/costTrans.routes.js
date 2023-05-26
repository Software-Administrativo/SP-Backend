import { Router } from "express";
import { costTransCtrl } from "../../controller/transformation/costTrans.controller.js";
import { costTransVali } from "../../validations/transformation/costTrans.validation.js";

const { validateExistCostTrans, validateRegisterCostTrans, validateUpdateCostTrans,validateHeaders } = costTransVali;

const { getCostTransId, getCostTrans, registerCostTrans, updateCostTrans, activeCostTrans, inactiveCostTrans } = costTransCtrl;

const routerCostTrans = Router();

routerCostTrans.get("/:id", validateExistCostTrans, getCostTransId);
routerCostTrans.get("/",validateHeaders, getCostTrans);
routerCostTrans.post("/register", validateRegisterCostTrans, registerCostTrans);
routerCostTrans.put("/active/:id", validateExistCostTrans, activeCostTrans);
routerCostTrans.put("/inactive/:id", validateExistCostTrans, inactiveCostTrans);
routerCostTrans.put("/update/:id", validateUpdateCostTrans, updateCostTrans);

export { routerCostTrans };
