import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { markHelper } from "../../helpers/maintenance/mark.helpers.js";

const { validateExistMarkById, } = markHelper;
const markVali = {}

//Validate if exist mark 
markVali.validateExistMarkById = [
    check("id","El id es obligatorio ").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistMarkById(id);
    }),
    validateFields,
];

//Validate fields for register mark 
markVali.validateRegisterMark = [
    check("name","El nombre de la marca es obligatorio").notEmpty().isString().exists(),
    check("descripcion","Descripcion de la marca es obligatoria"),
    validateFields
];

//validate fields for update mark
markVali.validateUpdateMark = [
    check("id","El id es obligatorio").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistMarkById(id);
    }),
    check("name","El nombre de la marca es obligatorio").notEmpty().isString(),
    check("descripcion","Descipcion de la marca es obligatoria").notEmpty().isString(),
    validateFields,
];

export { categoryVali }