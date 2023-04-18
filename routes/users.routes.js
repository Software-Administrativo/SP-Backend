import { Router } from "express";
import { userCtrl } from "../controller/users.controller.js";
import { usersVali } from "../validations/users.validation.js";

const {
  validateLoginUser,
  validateRegisterUser,
  validateExistUser,
  validateUpdateUser,
} = usersVali;

const {
  loginUser,
  registerUser,
  getUsers,
  updateUser,
  activateUser,
  deactivateUser,
  logoutUser,
} = userCtrl;

const routerUsers = Router();

routerUsers.get("/", getUsers);
routerUsers.post("/login", validateLoginUser, loginUser);
routerUsers.post("/register", validateRegisterUser, registerUser);
routerUsers.put("/activate/:id", validateExistUser, activateUser);
routerUsers.put("/inactive/:id", validateExistUser, deactivateUser);
routerUsers.put("/update/:id", validateUpdateUser, updateUser);
routerUsers.get("/logout", logoutUser);

export { routerUsers };
