import { Router } from "express";
import { cellarCtrl } from "../../controller/inventory/cellar.controller.js";
import { cellarVali } from "../../validations/inventory/cellar.validation.js";

const {
    validateExistCellarById,
    validateRegisterCellarById,
    validateUpdateCellarById,
    validateToken,
} = cellarVali;

const {
    getCellar,
    getCellarId,
    registerCellar,
    updateCellar,
    activateCellar,
    inactiveCellar,
} = cellarCtrl;

const routerCellars = Router();

routerCellars.get("/:id",validateExistCellarById, getCellarId);
routerCellars.get("/", validateToken, getCellar);
routerCellars.post("/register", validateRegisterCellarById, registerCellar);
routerCellars.put("/activate", validateExistCellarById, activateCellar);
routerCellars.put("/inactive", validateExistCellarById, inactiveCellar);
routerCellars.put("/update", validateUpdateCellarById, updateCellar);

export { routerCellars };