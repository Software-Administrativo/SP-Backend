import User from "../models/User.js";

const userHelper = {};

userHelper.validateExistUser = async (document) => {
  try {
    const user = await User.findOne({ numdocument: document });
    if (user) {
      throw new Error("El usuario ya existe");
    }
  } catch (error) {
    throw new Error("El usuario ya existe");
  }
};

userHelper.validateExistUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("El usuario no existe");
    }
  } catch (error) {
    throw new Error("El usuario no existe");
  }
};

//validate if one user exist by document but not for the same id
userHelper.validateUserByDocuAndId = async (document, id) => {
  console.log(document, id);
  try {
    const user = await User.findOne({ numdocument: document });
    if (user && user._id != id) {
      throw new Error("El usuario ya existe");
    }
  } catch (error) {
    throw new Error("El usuario ya existe");
  }
};

export { userHelper };
