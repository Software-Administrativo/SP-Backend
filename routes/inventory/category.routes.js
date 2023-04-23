import { Router } from "express";
import { categoryCtrl } from "../controller/inventory/category.controller.js";
import { categoryVali } from "../validations/inventory/category.validator.js";

const {
    validategetCategory,
    validategetCategoryId,
    validateregisterCategory,
    validateupdateCategory,
    validateactivateCategory,
    validateinactivateCategory,
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

routerCategory.get("/", getCategory);
routerCategory.get("/:id", validategetCategory, getCategoryId);


