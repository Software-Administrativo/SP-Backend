import User from "../models/User.js";

const userHelper = {};

userHelper.validateExistUser = async (document) => {
  try {


    const user = await User.findOne({ numdocument: document});
    console.log('user',user)

    if (user) {
      throw new Error("El usuario ya existe");
    }
  } catch (error) {
    throw new Error("El usuario ya existe");
  }
};


userHelper.validateExistUserById = async (id,farm) => {
  console.log(id,farm)
  try {
    //search user by id and farm //farms: [ { status: 0, _id: new ObjectId("645c7705f193f332d5a760bc") } ]
    const user = await User.findById(id)
    console.log('user',user)
    const existUserFarm = user.farms.find(f => f._id == farm)
    console.log('existUserFarm',existUserFarm)
    console.log('user',user)
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
