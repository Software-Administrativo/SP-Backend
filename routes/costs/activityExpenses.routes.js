import { Router } from "express";
import { activityExpensesCtrl } from "../../controller/costs/activityExpenses.controller.js";
import { activityExpensesVali } from "../../validations/costs/activityExpenses.validation.js";

const {
    validateExistActivityExpensesById,
    validateRegisterActivityExpenses,
    validateUpdateActivityExpenses,
    validateHeaders,
} = activityExpensesVali;

const {
    getActivityExpenses,
    activityExpensesId,
    registerActivityExpenses,
    updateActivityExpenses,
    activateActivityExpenses,
    inactivateActivityExpenses
} = activityExpensesCtrl;

const routerActivityExpenses = Router();

routerActivityExpenses.get("/:id",validateExistActivityExpensesById, activityExpensesId);
routerActivityExpenses.get("/", validateHeaders, getActivityExpenses);
routerActivityExpenses.post("/register", validateRegisterActivityExpenses,registerActivityExpenses);
routerActivityExpenses.put("/activate/:id", validateExistActivityExpensesById, activateActivityExpenses);
routerActivityExpenses.put("/inactivate/:id", validateExistActivityExpensesById, inactivateActivityExpenses);
routerActivityExpenses.put("/update/:id", validateUpdateActivityExpenses, updateActivityExpenses);

export { routerActivityExpenses };


