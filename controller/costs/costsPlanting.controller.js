import Costs from "../../models/costs/CostsPlanting.js"
const costsCtrl = {};

//get all costs of planting
costsCtrl.getCosts = async (req,res) => {
  const { farm } = req.headers;
  try {
    const costs = await Costs.find({farm});
    res.json({costs}); 
  }catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

// get costs by id 
costsCtrl.getCostsId = async (req, res) => {
  const { id } = req.params;
  try {
    const costs = await Costs.findById(id);
    res.json({costs});
  } catch (error) {
    res.json({msg: "No fue posible terminar la operación"})
  }
};

//register cost in the db
costsCtrl.registerCosts = async (req, res) => {
  const { farm } = req.headers;
  const {name, description,worth, lot} = req.body;
  try {
    const newCosts = new Costs({
      name:name.trim().toUpperCase(),
      description:description.trim(),
      farm,
      worth,
      lot
    });
    const costs = await newCosts.save();
    res.json({ msg:"Costo creado correctamente", costs});
  }catch (error){
    res.json({ msg: "No fue posible terminar con la operación"});
  }
};

//update costs in the db
costsCtrl.updateCost = async (req, res) => {
  const { id } =req.params;
  const { farm } = req.headers;
  const {name, description,worth, lot} = req.body;
  try {
    await Costs.findByIdAndUpdate(id,{
      name:name.trim().toUpperCase(),
      description:description.trim(),
      farm,
      worth,
      lot
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