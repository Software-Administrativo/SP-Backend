import CreateExpenses from "../../models/costs/CostsTypeExpenses.js"
const createExpensesCtrl = {};

//get all create type expenses
createExpensesCtrl.get = async (req,res) => {
  try {
    const createExpenses = await CreateExpenses.find();
    res.json({createExpenses}); 
  }catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

// get creation the type of expenses by id 
createExpensesCtrl.getCreateExpensesId = async (req, res) => {
  const { id } = req.params;
  try {
    const createExpenses = await CreateExpenses.findById(id);
    res.json({createExpenses});
  } catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

//register Creation type of expenses in the db
createExpensesCtrl.registerCreateExpenses = async (req, res) => {
  const {name, description, farm, lote} = req.body;
  try {
    const newcreateExpenses = new CreateExpenses({
      name,
      description,
      farm,
      lote
    });
    const createExpenses = await newcreateExpenses.save();
    res.json({ msg:"Gasto creado correctamente", createExpenses});
  }catch (error){
    res.json({ msg: "No fue posible terminar con la operación"});
  }
};

//update in the db
costsCtrl.updateCost = async (req, res) => {
  const { id } =req.params;
  const {name, description, farm, lote} = req.body;
  try {
    await costs.findByIdAndUpdate(id,{
      name,
      description,
      farm,
      lote
    });
    const costs = await Costs.findById(id);
    res.json({ msg:"Costo actualizado correctamente", costs});
  } catch (error){
    res.json({ msg: "No fue posible terminar la operación"}); 
  }
};

// active costs in the db 
costsCtrl.activateCosts = async (req, res) => {
  const { id } =req.params;
  try {
    await Costs.findByIdAndUpdate(id,{status: 0});
    res.json({ msg:"Costo activado correctamente"})
  }catch(error){
    res.json({ msg: "No fue posible terminar la operación"})
  }
};

 // inactive costs in the db
 costsCtrl.inactivateCosts = async (req, res) => {
  const { id } = req.params;
  try {
    await Costs.findByIdAndUpdate(id, { status: 1});
    res.json({ msg: "Costo inactivado correctamente "});
  }catch (error) {
    res.json({ msg: "No fue posible terminar la operacion"});
  }
};

export { costsCtrl };