import Order from "../../models/orders/Order.js";
import ModelTrans from "../../models/transformation/ModelTrans.js";

const orderHelper = {};

orderHelper.validateExistOrderById = async (id, farm) => {
  try {
    const order = await Order.findById(id, { farm });
    if (!order) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`La orden con el id ${id} no existe`);
  }
};

//validate model of order

orderHelper.validateModel = async (id, farm) => {
  try {
    const modeltrans = await ModelTrans.findById(id, { farm });
    if (!modeltrans) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`El modelo con el id ${id} no existe`);
  }
};

export { orderHelper };
