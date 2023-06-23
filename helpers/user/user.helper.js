import User from "../../models/user/User.js";

const userHelper = {};

userHelper.validateExistUser = async (document, farm) => {
  try {
    const user = await User.findOne({ numdocument: document, status: 0 });
    console.log("user1", user);
    if (user) {
      const existUserFarm = user.farms.find((f) => f._id == farm);

      if (user && existUserFarm) {
        throw new Error();
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("El usuario ya existe");
  }
};

userHelper.validateExistUserById = async (id, farm) => {
  console.log(id, farm);
  try {
    //search user by id and farm //farms: [ { status: 0, _id: new ObjectId("645c7705f193f332d5a760bc") } ]
    const user = await User.findById(id);
    console.log("user", user);
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    throw new Error("El usuario no existe");
  }
};

//validate if one user exist by document but not for the same id
userHelper.validateUserByDocuAndId = async (document, id) => {
  try {
    const user = await User.findOne({ numdocument: document, status: 0 });
    if (user && user._id != id) {
      throw new Error();
    }
  } catch (error) {
    throw new Error("El usuario ya existe");
  }
};

userHelper.validateExistUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email, status: 0 });
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    throw new Error("El usuario no existe");
  }
};

userHelper.uniqueEmail = async (email, id = "") => {
  try {
    const user = await User.findOne({ email: email, status: 0 });
    console.log('usuario email', user);
    if (id) {
      if (user && user._id != id) {
        throw new Error();
      }
    } else {
      if (user) {
        throw new Error();
      }
    }
  } catch (error) {
    throw new Error("El usuario ya existe por email");
  }
};

userHelper.validateUser = async (document) =>{
  try {
    const user = await User.findOne({ numdocument: document, status: 0 });
      if (!user) {
        throw new Error();
      }
  } catch (error) {
    throw new Error("El usuario no existe")
  }
};


export { userHelper };
