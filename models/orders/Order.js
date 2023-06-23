import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
    {
        models: {
            type: [Object],
            required: true
        },
       
        client: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        farm: {
            type: Schema.Types.ObjectId,
            ref: "Farm",
            required: true,
        },
        statuspay: {
            type: String,
            default: "PENDIENTE", //PAGADO PENDIENTE CANCELADO
        },
        statusorder: {
            type: String,
            default: "PENDIENTE", //ENTREGADO PENDIENTE CANCELADO
        },
        dateorder:{
            type: Date,
            required: true,
        },
        total: {
            type: Number,
            default: 0,
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