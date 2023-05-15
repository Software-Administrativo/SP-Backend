import { Router } from "express";
import { cellarCtrl } from "../../controller/inventory/cellar.controller.js";
import { cellarVali } from "../../validations/inventory/cellar.validation.js";

const {
    validateExistCellarById,
    validateRegisterCellarById,
    validateUpdateCellarById,
    validateHeaders,
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
routerCellars.get("/", validateHeaders, getCellar);
routerCellars.post("/register", validateRegisterCellarById, registerCellar);
routerCellars.put("/activate/:id", validateExistCellarById, activateCellar);
routerCellars.put("/inactive/:id", validateExistCellarById, inactiveCellar);
routerCellars.put("/update/:id", validateUpdateCellarById, updateCellar);

export { routerCellars };