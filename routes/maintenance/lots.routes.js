import { Router } from "express";
import { lotsCtrl } from "../../controller/maintenance/lots.controller.js";
import { lotsVali } from "../../validations/maintenance/lots.validation.js";

const { validateExistLot, validateRegisterLot, validateUpdateLot,validateToken } = lotsVali;

const { getLotId, getLots, registerLot, updateTypeDocuments, activeTypeDocuments, inactiveTypeDocuments } =
lotsCtrl;

const routerLots = Router();

routerLots.get("/:id", validateExistLot, getLotId);
routerLots.get("/",validateToken, getLots);
routerLots.post("/register", validateRegisterLot, registerLot);
routerLots.put("/active/:id", validateExistLot, activeTypeDocuments);
routerLots.put("/inactive/:id", validateExistLot, inactiveTypeDocuments);
routerLots.put("/update/:id", validateUpdateLot, updateTypeDocuments);

export { routerLots };

