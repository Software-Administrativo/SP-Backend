import { Router } from "express";
import { typeExpensesCtrl } from "../../controller/costs/typeExpenses.controller.js";
import { typeExpensesVali } from "../../validations/costs/typeExpenses.validation.js";

const {
  validateExistTypeExpensesById,
  validateRegisterTypeExpenses,
  validateUpdateTypeExpenses,
  validateToken
} = typeExpensesVali;

const { 
  getTypeExpenses,
  getTypeExpensesId,
  registerTypeExpenses,
  updateTypeExpenses,
  activateTypeExpenses,
  inactivateTypeExpenses

} = typeExpensesCtrl;

const routerTypeExpenses = Router();

routerTypeExpenses.get("/:id",validateExistTypeExpensesById, getTypeExpensesId);
routerTypeExpenses.get("/", validateToken, getTypeExpenses);
routerTypeExpenses.post("/register", validateRegisterTypeExpenses, registerTypeExpenses);
routerTypeExpenses.put("/activate/:id", validateExistTypeExpensesById, activateTypeExpenses);
routerTypeExpenses.put("/inactivate/:id", validateExistTypeExpensesById, inactivateTypeExpenses);
routerTypeExpenses.put("/update/:id", validateUpdateTypeExpenses, updateTypeExpenses);

export { routerTypeExpenses}