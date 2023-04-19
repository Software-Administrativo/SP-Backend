import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { userHelper } from "../helpers/user.helper.js";

const { 
  validateExistUser, 
  validateExistUserById, 
  validateUserByDocuAndId } =
  userHelper;

const usersVali = {};

//validate fields for register user
usersVali.validateRegisterUser = [
  check("name", "El nombre es obligatorio").notEmpty().isString(),
  check("tpdocument", "El tipo de documento es obligatorio")
    .notEmpty()
    .isString(),
  check("numdocument", "El numero de documento es obligatorio")
    .notEmpty()
    .isString(),
  check("numdocument").custom(async (numdocument) => {
    await validateExistUser(numdocument);
  }),

  check("role", "El rol es obligatorio").notEmpty().isString(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  check(
    "password",
    "La contraseña debe tener minimo 6 caracteres y maximo 20"
  ).isLength({ min: 6, max: 20 }),
  check(
    "password",
    "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
  validateFields,
];

//validate fields for update user
usersVali.validateUpdateUser = [
  check("id", "El id es obligatorio").notEmpty().isString().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistUserById(id);
  }),
  check("name", "El nombre es obligatorio").notEmpty().isString(),
  check("tpdocument", "El tipo de documento es obligatorio")
    .notEmpty()
    .isString(),
  check("numdocument", "El numero de documento es obligatorio")
    .notEmpty()
    .isString(),
  //pasar el id y el numero de documento para validar si el numero de documento ya existe pero no para el mismo id
  check("numdocument").custom(async (numdocument, { req }) => {
    await validateUserByDocuAndId(numdocument, req.params.id);
  }),
  check("role", "El rol es obligatorio").notEmpty().isString(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  check(
    "password",
    "La contraseña debe tener minimo 6 caracteres y maximo 20"
  ).isLength({ min: 6, max: 20 }),
  check(
    "password",
    "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
  validateFields,
];

//validate fields for login
usersVali.validateLoginUser = [
  check("tpdocument", "El tipo de documento es obligatorio")
    .notEmpty()
    .isString(),
  check("numdocument", "El numero de documento es obligatorio")
    .notEmpty()
    .isString(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  validateFields,
];

//validate if exist user
usersVali.validateExistUser = [
  check("id", "El id es obligatorio").notEmpty().isString().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistUserById(id);
  }),
  validateFields,
];

export { usersVali };
