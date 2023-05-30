import { Router } from "express";
import { userCtrl } from "../../controller/user/users.controller.js";
import { usersVali } from "../../validations/user/users.validation.js";

const {
  validateLoginUser,
  validateRegisterUser,
  validateExistUser,
  validateUpdateUser,
  validateRequestResetPassword,
  validateHeaders,
  validateTokenResetPassword,
} = usersVali;

const {
  getUserId,
  loginUser,
  registerUser,
  getUsers,
  getFarmsUser,
  reqResetPassword,
  changePassword,
  updateUser,
  activeUser,
  inactiveUser,
  logoutUser,
} = userCtrl;

const routerUsers = Router();

routerUsers.get("/logout", validateHeaders, logoutUser);
routerUsers.get("/:id", validateExistUser, getUserId);
routerUsers.get("/", validateHeaders, getUsers);
routerUsers.post("/login", validateLoginUser, loginUser);
routerUsers.post("/register", validateRegisterUser, registerUser);
routerUsers.post("/requestresetpass", validateRequestResetPassword, reqResetPassword);
routerUsers.post("/changePassword", validateTokenResetPassword, changePassword);
routerUsers.put("/active/:id", validateExistUser, activeUser);
routerUsers.put("/inactive/:id", validateExistUser, inactiveUser);
routerUsers.put("/update/:id", validateUpdateUser, updateUser);

export { routerUsers };

