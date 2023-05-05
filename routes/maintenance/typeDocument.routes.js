import { Router } from "express";
import { typeDocumentCtrl } from "../../controller/maintenance/typeDocument.controller.js";
import { typeDocumentVali } from "../../validations/maintenance/typeDocument.validation.js";

const { validateExistTypeDocument, validateRegisterTypeDocument, validateUpdateTypeDocument,validateHeaders } = typeDocumentVali;

const { getTypeDocumentId, getTypeDocuments, registerTypeDocument, updateTypeDocuments, activeTypeDocuments, inactiveTypeDocuments } =
typeDocumentCtrl;

const routerTypeDocument = Router();

routerTypeDocument.get("/:id", validateExistTypeDocument, getTypeDocumentId);
routerTypeDocument.get("/",validateHeaders, getTypeDocuments);
routerTypeDocument.post("/register", validateRegisterTypeDocument, registerTypeDocument);
routerTypeDocument.put("/active/:id", validateExistTypeDocument, activeTypeDocuments);
routerTypeDocument.put("/inactive/:id", validateExistTypeDocument, inactiveTypeDocuments);
routerTypeDocument.put("/update/:id", validateUpdateTypeDocument, updateTypeDocuments);

export { routerTypeDocument };
