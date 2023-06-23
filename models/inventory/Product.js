import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:"Category",
        required: true,
    },
/*     mark: {
      type: String,
      required: true,
    }, */
    mark: {
      type: Schema.Types.ObjectId,
      ref: "Mark",
      required: true,
  },
    amount: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
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
    //propiedad para crear la fecha de creacion y de actualizacion automaticamente
    timestamps: true,
  }
);
export default model("Product",ProductSchema)