import { Router } from "express";
import { peopleCtrl } from "../../controller/maintenance/peoples.controller.js";
import { peoplesVali } from "../../validations/maintenance/peoples.validation.js";

const { validateExistPeople, validateRegisterPeople, validateUpdatePeople,validateHeaders } =
peoplesVali;

const {
  getPeopleId,
  getPeoples,
  registerPeople,
  updatePeoples,
  activePeoples,
  inactivePeoples,
} = peopleCtrl;

const routerPeople = Router();

routerPeople.get("/:id", validateExistPeople, getPeopleId);
routerPeople.get("/",validateHeaders, getPeoples);
routerPeople.post("/register", validateRegisterPeople, registerPeople);
routerPeople.put("/active/:id", validateExistPeople, activePeoples);
routerPeople.put("/inactive/:id", validateExistPeople, inactivePeoples);
routerPeople.put("/update/:id", validateUpdatePeople, updatePeoples);

export { routerPeople };
