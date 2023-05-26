import { Schema, model } from "mongoose";


const CostTransSquema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lot: {
      type: Schema.Types.ObjectId,
      ref: "Lot",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    cost: {
      type: Number,
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

export default model("CostTrans", CostTransSquema);
