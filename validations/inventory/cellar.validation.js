import { check } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { cellarHelper } from "../../helpers/maintenance/cellar.helpers.js";

const { validateExistCellarById, } = cellarHelper;
const cellarVali = {}

//Validate if exist cellar
cellarVali.validateExistCellarById = [
    check("id","El id es obligatorio ").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistCellarById(id);
    }),
    validateFields,
];

//Validate fields for register cellar 
cellarVali.validateRegisterCellarById = [
    check("name","El nombre de la bodega es obligatorio").notEmpty().isString().exists(),
    check("descripcion","Descripcion de la bodega es obligatoria"),
    validateFields
];

//validate fields for update cellar
cellarVali.validateUpdateCellarById = [
    check("id","El id es obligatorio").notEmpty().isString().exists(),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(async (id) => {
        await validateExistCellarById(id);
    }),
    check("name","El nombre de la marca es obligatorio").notEmpty().isString(),
    check("descripcion","Descripcion de la marca es obligatoria").notEmpty().isString(),
    validateFields,
];

export { cellarVali }