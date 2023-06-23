import { Router } from "express";
import { productCtrl } from "../../controller/inventory/product.controller.js";
import { productVali } from "../../validations/inventory/product.validation.js";

const {
    validateExistProductById,
    validateRegisterProduct,
    validateUpdateProduct,
    validateHeaders,
} = productVali;

const {
    getProduct,
    getPoductId,
    registerProduct,
    updateProduct,
    activateProduct,
    inactiveProduct,
} = productCtrl;

const routerProduct = Router ();

routerProduct.get("/:id", validateExistProductById, getPoductId);
routerProduct.get("/", validateHeaders, getProduct);
routerProduct.post("/register", validateRegisterProduct, registerProduct);
routerProduct.put("/activate/:id", validateExistProductById, activateProduct);
routerProduct.put("/inactivate/:id", validateExistProductById, inactiveProduct);
routerProduct.put("/update/:id", validateUpdateProduct, updateProduct);

export { routerProduct };