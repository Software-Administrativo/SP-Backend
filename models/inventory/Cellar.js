import { Schema, model } from "mongoose";

const CellarSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        farm: {
            type: String,
            required: true,
        },
        tpcontrato:{
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        valor: {
            type: Number,
            required: true,
        },
    },
    {
        //propiedad para crear la fecha de creacion y de actualizacion automaticamente 
        timestamps: true,
      }
);
export default model ("Cellar",CellarSchema)