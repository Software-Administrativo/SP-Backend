import ActivityExpenses from "../../models/costs/activityExpenses.js";
const activityExpensesCtrl = {};

//get all type activity of expenses
activityExpensesCtrl.getActivityExpenses = async (req, res) => {
  const { farm } = req.headers;
  try {
    const activityExpenses = await ActivityExpenses.find({ farm });
    res.json({ activityexpenses: activityExpenses });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operación" });
  }
};

// get expenses of activity by id
activityExpensesCtrl.activityExpensesId = async (req, res) => {
  const { id } = req.params;
  try {
    const activityExpenses = await ActivityExpenses.findById(id);
    res.json({ activityExpenses });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operación" });
  }
};

//register expenses of activity in the db
activityExpensesCtrl.registerActivityExpenses = async (req, res) => {
  const { name, description, value } = req.body;
  const { farm } = req.headers;
  try {
    const newActivityExpenses = new ActivityExpenses({
      name: name.trim().toUpperCase(),
      description: description.trim(),
      farm,
      value,
    });
    const activityExpenses = await newActivityExpenses.save();
    res.json({
      msg: "Registro de gasto de actividades creado correctamente",
      activityExpenses,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "No fue posible terminar con la operación" });
  }
};

//Update expenses of activity in the db
activityExpensesCtrl.updateActivityExpenses = async (req, res) => {
  const { id } = req.params;
  const { farm } = req.headers;
  const { name, description, value } = req.body;
  try {
    await ActivityExpenses.findByIdAndUpdate(id, {
      name: name.trim().toUpperCase(),
      description,
      farm,
      value,
    });
    const activityExpenses = await ActivityExpenses.findById(id);
    res.json({
      msg: "Actualización de gasto de actividades actualizado correctamente",
      activityExpenses,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "No fue posible terminar la operación" });
  }
};

// active expenses of activity in the db
activityExpensesCtrl.activateActivityExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    await ActivityExpenses.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Gasto de actividades activado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operación" });
  }
};

// inactive expenses of activity in the db
activityExpensesCtrl.inactivateActivityExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    await ActivityExpenses.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Gasto de actividades inactivado correctamente " });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

export { activityExpensesCtrl };
