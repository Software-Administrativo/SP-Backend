import { Schema, model } from 'mongoose';

const CostsPlantingSchema = new Schema(
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
      type: String,
      required: true
    },
    lote: {
      type: String,
      required: true
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
export default model("CostsPlanting", CostsPlantingSchema)