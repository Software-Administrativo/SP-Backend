import { Router } from "express";
import { userCtrl } from "../controller/users.controller.js";
import { usersVali } from "../validations/users.validation.js";

const {
  validateLoginUser,
  validateRegisterUser,
  validateExistUser,
  validateUpdateUser,
  validateToken
} = usersVali;

const {
  getUserId,
  loginUser,
  registerUser,
  getUsers,
  updateUser,
  activeUser,
  inactiveUser,
  logoutUser,
} = userCtrl;

const routerUsers = Router();

routerUsers.get("/:id", validateExistUser, getUserId);
routerUsers.get("/",validateToken, getUsers);
routerUsers.post("/login", validateLoginUser, loginUser);
routerUsers.post("/register", validateRegisterUser, registerUser);
routerUsers.put("/active/:id", validateExistUser, activeUser);
routerUsers.put("/inactive/:id", validateExistUser, inactiveUser);
routerUsers.put("/update/:id", validateUpdateUser, updateUser);
routerUsers.get("/logout",validateToken, logoutUser);

export { routerUsers };
