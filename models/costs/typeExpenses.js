import { Schema, model } from 'mongoose';

const TypeExpensesSchema = new Schema(
  {
    name: {
      type: stringify,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    farm: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 0
    },
  },
  {
    //propiedad para crear la fecha de creacion y de actualizacion automaticamente
    timestamps: true,
  }
);
export default model("TypeExpenses", TypeExpensesSchema)