import { Schema, model } from "mongoose";

const PeopleSquema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tpdct: {
        type: Schema.Types.ObjectId,
        ref: "TypeDocument",
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    eps: {
        type: Schema.Types.ObjectId,
        ref: "Eps",
        required: true,
    },
    typePeople: {
        type: String,
        default: "Empleado",
        required: true,
    },
    farm: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
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

export default model("People", PeopleSquema);
