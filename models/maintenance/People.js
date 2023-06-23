import { Schema, model } from "mongoose";

const PeopleSquema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tpdct: {
        type: String,
        required: true,
        default: "CC",
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
        default: "TRABAJADOR",
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
