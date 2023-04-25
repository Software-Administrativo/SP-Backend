import { check } from "express-validator";
import webToken from "../middlewares/webToken.js";
import { validateFields } from "../middlewares/validateFields.js";
import { userHelper } from "../helpers/user.helper.js";

const { validateExistUser, validateExistUserById, validateUserByDocuAndId } =
  userHelper;
  const { validateToken } = webToken;

const usersVali = {};

//validate fields for register user
usersVali.validateRegisterUser = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("tpdocument", "El tipo de documento es obligatorio").notEmpty(),
  check("numdocument", "El numero de documento es obligatorio").notEmpty(),
  check("numdocument").custom(async (numdocument) => {
    await validateExistUser(numdocument);
  }),

  check("role", "El rol es obligatorio").notEmpty(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  check(
    "password",
    "La contraseña debe tener minimo 6 caracteres y maximo 20"
  ).isLength({ min: 6, max: 20 }),
  check(
    "password",
    "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for update user
usersVali.validateUpdateUser = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistUserById(id);
  }),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("tpdocument", "El tipo de documento es obligatorio").notEmpty(),
  check("numdocument", "El numero de documento es obligatorio").notEmpty(),
  //pasar el id y el numero de documento para validar si el numero de documento ya existe pero no para el mismo id
  check("numdocument").custom(async (numdocument, { req }) => {
    await validateUserByDocuAndId(numdocument, req.params.id);
  }),
  check("role", "El rol es obligatorio").notEmpty(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  check(
    "password",
    "La contraseña debe tener minimo 6 caracteres y maximo 20"
  ).isLength({ min: 6, max: 20 }),
  check(
    "password",
    "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate fields for login
usersVali.validateLoginUser = [
  check("tpdocument", "El tipo de documento es obligatorio").notEmpty(),
  check("numdocument", "El numero de documento es obligatorio").notEmpty(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  validateFields,
];

//validate if exist user
usersVali.validateExistUser = [
  check("id", "El id es obligatorio").notEmpty().exists(),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(async (id) => {
    await validateExistUserById(id);
  }),
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
  validateFields,
];

//validate token 
usersVali.validateToken =[
  check('token').custom(async (token) => {
    await validateToken(token);
    }),
]

export { usersVali };
