import { Router } from "express";
import { markCtrl } from "../../controller/inventory/mark.controller.js";
import { markVali } from "../../validations/inventory/mark.validation.js";

const {
    validateExistMarkById,
    validateRegisterMark,
    validateUpdateMark,
    validateToken,
} = markVali;

const {
    getMarks,
    getMarkId,
    registerMark,
    updateMark,
    activateMark,
    inactiveMark
} = markCtrl;

const routerMark = Router();

routerMark.get("/:id", validateExistMarkById, getMarkId);
routerMark.get("/", validateToken, getMarks);
routerMark.post("/register", validateRegisterMark, registerMark);
routerMark.put("/activate", validateExistMarkById, activateMark);
routerMark.put("/inactivate", validateExistMarkById, inactiveMark);
routerMark.put("/update", validateUpdateMark, updateMark);

export { routerMark };