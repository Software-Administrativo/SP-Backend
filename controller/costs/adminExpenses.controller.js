import AdminExpenses  from "../../models"
const adminExpensesCtrl = {};

//get all admin of the expenses 
adminExpensesCtrl.getAdminExpenses = async (req,res) => {
  try {
    const adminExpenses = await AdminExpenses.find();
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
  const {name, description, type, value} = req.body;
  try {
    const newAdminExpenses = new AdminExpenses({
      name,
      description,
      type,
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
  const { id } =req.params;
  const {name, description, type, value} = req.body;
  try {
    await adminExpenses.findByIdAndUpdate(id,{
      name,
      description,
      type,
      value
    });
    const adminExpenses = await AdminExpenses.findById(id);
    res.json({ msg:"Actualización de gasto de administracion actualizado correctamente", adminExpenses});
  } catch (error){
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