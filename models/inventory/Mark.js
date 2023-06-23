import { Schema, model } from "mongoose";

const MarkSchema = new Schema(
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
/*         category: {
            type: String,
            default: true,
        }, */
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
          },
/*         description: {
            type: String,
            required: true,
        }, */
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
export default model("Mark",MarkSchema)