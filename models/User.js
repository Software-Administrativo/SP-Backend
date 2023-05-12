import { Schema, model } from "mongoose";
import bcryp from "bcryptjs";

const UserSquema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tpdocument: {
      type: String,
      required: true,
    },
    numdocument: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "ADMIN",
    },
    password: {
      type: String,
      required: true,
    },

    //farms es un arreglo que contiene objetos y cada objeto es una finca con su id y estatus
    farms: [
      {
          type: Schema.Types.ObjectId,
          ref: "Farm",
      },
    ],
    status: {
      type: Number, 
      default: 0,
    },
  },
  {
    //propiedad para crear la fecha de creacion y de actualizacion actuamaticamnete
    timestamps: true,
  }
);

//metodo para cifrar la contraseña
UserSquema.methods.encryptPassword = async (password) => {
  const salt = await bcryp.genSalt(10);
  return await bcryp.hash(password, salt);
};

//metodo para comparar la contraseña cifrada con la que se recibe
UserSquema.methods.matchPassword = async function (password) {
  return await bcryp.compare(password, this.password);
};

export default model("User", UserSquema);
