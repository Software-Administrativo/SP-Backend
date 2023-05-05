import { Router } from "express";
import { productCtrl } from "../../controller/inventory/product.controller.js";
import { productVali } from "../../validations/inventory/product.validation.js";

const {
    validateExistProductById,
    validateRegisterProduct,
    validateUpdateProduct,
    validateToken,
} = productVali;

const {
    getProduct,
    getPoductId,
    registerPoduct,
    updatePoduct,
    activateProduct,
    inactiveProduct,
} = productCtrl;

const routerProduct = Router ();

routerProduct.get("/id:", validateExistProductById, getPoductId);
routerProduct.get("/", validateToken, getProduct);
routerProduct.post("/register", validateRegisterProduct, registerPoduct);
routerProduct.put("/activate/:id", validateExistProductById, activateProduct);
routerProduct.put("/inactivate/:id", validateExistProductById, inactiveProduct);
routerProduct.put("/update", validateUpdateProduct, updatePoduct);

export { routerProduct };