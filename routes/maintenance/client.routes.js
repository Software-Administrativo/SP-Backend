import { Router } from "express";
import { clientCtrl } from "../../controller/maintenance/client.controller.js";
import { clientVali } from "../../validations/maintenance/client.validation.js";

const { validateExistClient, validateRegisterClient, validateUpdateClient, validateHeaders } = clientVali;

const { getClientId,searchClient, getClients, registerClient, updateClient, activeClient, inactiveClient } =
    clientCtrl;

const routerClient = Router();

routerClient.get("/search", searchClient);
routerClient.get("/:id", validateExistClient, getClientId);
routerClient.get("/", validateHeaders, getClients);
routerClient.post("/register", validateRegisterClient, registerClient);
routerClient.put("/active/:id", validateExistClient, activeClient);
routerClient.put("/inactive/:id", validateExistClient, inactiveClient);
routerClient.put("/update/:id", validateUpdateClient, updateClient);

export { routerClient };
