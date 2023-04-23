import { Schema, model } from "mongoose";

const CellarSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        estate: {
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
        status: {
            type: Number,
            default: 0,
        },
    }
)
export default model ("Cellar",CellarSchema)