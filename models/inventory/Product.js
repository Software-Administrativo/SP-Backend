import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
    mark: {
      type: String,
      required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  },
  {
    //propiedad para crear la fecha de creacion y de actualizacion automaticamente
    timestamps: true,
  }
);
export default model("product",ProductSchema)