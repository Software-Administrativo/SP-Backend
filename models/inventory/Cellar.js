import { Schema, model } from "mongoose";

const CellarSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        farm: {
            type: Schema.Types.ObjectId,
            ref: "Farm",
            required: true,
          },
        tpcontract:{
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
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
export default model ("Cellar",CellarSchema)