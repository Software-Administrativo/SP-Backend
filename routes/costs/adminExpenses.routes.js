import { Router } from "express";
import { adminExpensesCtrl } from "../../controller/costs/adminExpenses.controller.js";
import { adminExpensesVali} from "../../validations/costs/adminExpenses.validation.js";


const {
    validateExistAdminExpensesById,
    validateRegisterAdminExpenses,
    validateUpdateAdminExpenses,
    validateHeaders,
} = adminExpensesVali;

const {
    getAdminExpenses,
    adminExpensesId,
    registerAdminExpenses,
    updateAdminExpenses,
    activateAdminExpenses,
    inactivateAdminExpenses
} = adminExpensesCtrl;

const routerAdminExpenses = Router();

routerAdminExpenses.get("/:id",validateExistAdminExpensesById, adminExpensesId);
routerAdminExpenses.get("/", validateHeaders, getAdminExpenses);
routerAdminExpenses.post("/register", validateRegisterAdminExpenses,registerAdminExpenses);
routerAdminExpenses.put("/activate/:id", validateExistAdminExpensesById, activateAdminExpenses);
routerAdminExpenses.put("/inactivate/:id", validateExistAdminExpensesById, inactivateAdminExpenses);
routerAdminExpenses.put("/update/:id", validateUpdateAdminExpenses, updateAdminExpenses);

export { routerAdminExpenses };


