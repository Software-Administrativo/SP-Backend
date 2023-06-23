import { Schema, model } from "mongoose";

const TypeDocumentSquema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

export default model("TypeDocument", TypeDocumentSquema);
