import TypeExpenses from "../../models/costs/typeExpenses.js"
const typeExpensesCtrl = {};

//get all create type expenses
typeExpensesCtrl.getTypeExpenses = async (req,res) => {
  try {
    const typeExpenses = await TypeExpenses.find();
    res.json({typeExpenses}); 
  }catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

// get creation the type of expenses by id 
typeExpensesCtrl.getTypeExpensesId = async (req, res) => {
  const { id } = req.params;
  try {
    const typeExpenses = await TypeExpenses.findById(id);
    res.json({typeExpenses});
  } catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

//register Creation type of expenses in the db
typeExpensesCtrl.registerTypeExpenses = async (req, res) => {
  const {name, description, type, value} = req.body;
  try {
    const newtypeExpenses = new TypeExpenses({
      name,
      description,
      type,
      value
    });
    const typeExpenses = await newtypeExpenses.save();
    res.json({ msg:"Gasto creado correctamente", typeExpenses});
  }catch (error){
    res.json({ msg: "No fue posible terminar con la operación"});
  }
};

//update in the db
typeExpensesCtrl.updateTypeExpenses = async (req, res) => {
  const { id } =req.params;
  const {name, description, type, value} = req.body;
  try {
    await typeExpenses.findByIdAndUpdate(id,{
      name,
      description,
      type,
      value
    });
    const typeExpenses = await TypeExpenses.findById(id);
    res.json({ msg:"Tipo de gastos actualizado correctamente", typeExpenses});
  } catch (error){
    res.json({ msg: "No fue posible terminar la operación"}); 
  }
};

// active Creation type of expenses in the db 
typeExpensesCtrl.activateTypeExpenses = async (req, res) => {
  const { id } =req.params;
  try {
    await TypeExpenses.findByIdAndUpdate(id,{status: 0});
    res.json({ msg:"Tipo de gastos activado correctamente"})
  }catch(error){
    res.json({ msg: "No fue posible terminar la operación"})
  }
};

 // inactive Creation type of expenses in the db
 typeExpensesCtrl.inactivateTypeExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    await TypeExpenses.findByIdAndUpdate(id, { status: 1});
    res.json({ msg: "Tipo de gastos inactivado correctamente "});
  }catch (error) {
    res.json({ msg: "No fue posible terminar la operacion"});
  }
};

export { typeExpensesCtrl };