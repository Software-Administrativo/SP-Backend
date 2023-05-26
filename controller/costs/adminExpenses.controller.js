import AdminExpenses  from "../../models/costs/adminExpenses.js"
const adminExpensesCtrl = {};

//get all admin of the expenses 
adminExpensesCtrl.getAdminExpenses = async (req,res) => {
  const { farm } = req.headers;
  try {
    const adminExpenses = await AdminExpenses.find({farm});
    res.json({adminExpenses}); 
  }catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

// get expenses of administration by id 
adminExpensesCtrl.adminExpensesId = async (req, res) => {
  const { id } = req.params;
  try {
    const adminExpensesId = await AdminExpenses.findById(id);
    res.json({adminExpensesId});
  } catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

//register expenses of administration in the db
adminExpensesCtrl.registerAdminExpenses = async (req, res) => {
  const { farm } = req.headers;
  const {name, description, value} = req.body;
  try {
    const newAdminExpenses = new AdminExpenses({
      name:name.trim().toUpperCase(),
      description: description.trim(),
      farm,
      value
    });
    const adminExpenses = await newAdminExpenses.save();
    res.json({ msg:"Registro de gasto de administracion creado correctamente", adminExpenses});
  }catch (error){
    res.json({ msg: "No fue posible terminar con la operación"});
  }
};

//Update expenses of administration in the db
adminExpensesCtrl.updateAdminExpenses = async (req, res) => {
  const { id } = req.params;
  const { farm } = req.headers;
  const {name, description, value} = req.body;
  try {
    await AdminExpenses.findByIdAndUpdate(id,{
      name:name.trim().toUpperCase(),
      description:description.trim(),
      farm,
      value
    });
    const adminExpenses = await AdminExpenses.findById(id);
    res.json({ msg:"Actualización de gasto de administracion actualizado correctamente", adminExpenses});
  } catch (error){
    console.log(error)
    res.json({ msg: "No fue posible terminar la operación"}); 
  }
};

// active expenses of administration in the db 
adminExpensesCtrl.activateAdminExpenses = async (req, res) => {
  const { id } =req.params;
  try {
    await AdminExpenses.findByIdAndUpdate(id,{status: 0});
    res.json({ msg:"Gasto de administracion activado correctamente"})
  }catch(error){
    res.json({ msg: "No fue posible terminar la operación"})
  }
};

 // inactive expenses of administration in the db
 adminExpensesCtrl.inactivateAdminExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    await AdminExpenses.findByIdAndUpdate(id, { status: 1});
    res.json({ msg: "Gasto de administracion inactivado correctamente "});
  }catch (error) {
    res.json({ msg: "No fue posible terminar la operacion"});
  }
};

export { adminExpensesCtrl };