import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        model: {
            type: [Object],
            required: true
        },
        statusorder: {
            type: String,
            default: "Pendiente",
        },
        client: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: "",
        },
        document: {
            type: String,
            default: "",
        },
        address: {
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
        //propiedad para crear la fecha de creacion y de actualizacion automaticamente
        timestamps: true,
      }
);
export default model("Order",OrderSchema)