import { Schema, model } from "mongoose";

const LotsSquema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    areasize: {
      type: Number,
      required: true,
    },
    lotestate: {
      type: String,
      default: "DISPONIBLE",
    },
    soildstate: {
      type: String,
      default: "FERTIL",
    },
    classlote: {
      type: String,
      default: "PADRE",
    },
    fatherlot: {
      type: String,
      default: "",
    },
    sowingdensity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
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

export default model("Lot", LotsSquema);
