import { Router } from "express";
import { categoryCtrl } from "../../controller/inventory/category.controller.js";
import { categoryVali } from "../../validations/inventory/category.validation.js";

const {
    validateExistCategoryById,
    validateRegisterCategory,
    validateUpdateCategory,
    validateHeaders,
} = categoryVali;

const {
    getCategory,
    getCategoryId,
    registerCategory,
    updateCategory,
    activateCategory,
    inactivateCategory
} = categoryCtrl;

const routerCategory = Router();

routerCategory.get("/:id",validateExistCategoryById, getCategoryId);
routerCategory.get("/", validateHeaders, getCategory);
routerCategory.post("/register", validateRegisterCategory,registerCategory);
routerCategory.put("/activate/:id", validateExistCategoryById, activateCategory);
routerCategory.put("/inactivate/:id", validateExistCategoryById, inactivateCategory);
routerCategory.put("/update/:id", validateUpdateCategory, updateCategory);

export { routerCategory };


