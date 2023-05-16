import Order from "../../models/orders/Order.js";

const orderHelper = {};

orderHelper.validateExistOrderById = async (id) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`La orden con el id ${id} no existe`);
  }
};

export { orderHelper };
