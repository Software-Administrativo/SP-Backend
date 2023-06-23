import { validationResult } from "express-validator";

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ msg: "Error en la validacion", errors: errors.array() });
  }
  next();
};

export { validateFields };
