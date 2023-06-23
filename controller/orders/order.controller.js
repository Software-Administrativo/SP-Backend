import Order from "../../models/orders/Order.js";
import ModelTrans from "../../models/transformation/ModelTrans.js";

const orderCtrl = {};

//get all orders
orderCtrl.getOrders = async (req, res) => {
  const { farm } = req.headers;
  try {
    const orders = await Order.find({ farm }).populate("client");
    res.json({ orders });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get order by id in the db
orderCtrl.getOrderId = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("client");
    res.json({ order });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register order in the db
orderCtrl.registerOrder = async (req, res) => {
  const { client,statusorder, models,dateorder } = req.body;
  const { farm } = req.headers;

  let newModels = [];
  let totalCost = 0;

  try {
    for (let i = 0; i < models.length; i++) {
      const model = await ModelTrans.findById(models[i].id);
      newModels.push({
        id: model._id,
        name: model.name,
        quantity: models[i].quantity,
        unitvalue: model.unitvalue,
        cost: model.unitvalue * models[i].quantity,
      });
      totalCost += model.unitvalue * models[i].quantity;
    }

    const newOrder = new Order({
      client,
      models: newModels,
      statusorder,
      farm,
      dateorder,
      total: totalCost,
    });
    const order = await newOrder.save();
    res.json({ msg: "Pedido creado correctamente", order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update order in the db
orderCtrl.updateOrders = async (req, res) => {
  const { id } = req.params;
  const { client,statusorder, models,dateorder } = req.body;
  const { farm } = req.headers;

  let newModels = [];
  let totalCost = 0;
  try {
    for (let i = 0; i < models.length; i++) {
      const model = await ModelTrans.findById(models[i].id);
      newModels.push({
        id: model._id,
        name: model.name,
        quantity: models[i].quantity,
        unitvalue: model.unitvalue,
        cost: model.unitvalue * models[i].quantity,
      });
      totalCost += model.unitvalue * models[i].quantity;
    }

    await Order.findByIdAndUpdate(id, {
      client,
      models: newModels,
      statusorder,
      farm,
      dateorder,
      total: totalCost,
    });

    const updateOrder = await Order.findById(id);
    res.json({ msg: "Pedido actualizado correctamente", order: updateOrder });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//change status order to pay
orderCtrl.payOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndUpdate(id, { statuspay: "PAGADO" });
    res.json({ msg: "Pedido pagado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//active order in the db
orderCtrl.activeOrders = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndUpdate(id, { status: 0 , statusorder: "PENDIENTE", statuspay: "PENDIENTE"});
    res.json({ msg: "Pedido activado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive order in the db
orderCtrl.inactiveOrders = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndUpdate(id, { status: 1 , statusorder: "CANCELADO", statuspay: "CANCELADO"});
    res.json({ msg: "Pedido inactivado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//deliver order in the db
orderCtrl.deliverOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndUpdate(id, { status: 0 , statusorder: "ENTREGADO"});
    res.json({ msg: "Pedido entregado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { orderCtrl };
