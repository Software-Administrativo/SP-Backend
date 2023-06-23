import { Schema, model } from "mongoose";

const ClientSquema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },
        document: {
            type: String,
            required: true,
        },
        address: {
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
        //propiedad para crear la fecha de creacion y de actualizacion actuamaticamnete
        timestamps: true,
    }
);

export default model("Client", ClientSquema);
