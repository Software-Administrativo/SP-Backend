import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    code: {
        type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },
  },
  {
    //propiedad para crear la fecha de creacion y de actualizacion automaticamente
    timestamps: true,
  }
);
export default model("product",ProductSchema)