import Category from "../../models/inventory/Category.js"
const categoryCtrl = {};

//get all category
categoryCtrl.getCategory = async (req, res) => {
  try {
    const category = await Category.find({ status: 0 });
    res.json({category});
  }catch (error) {
    res.json({message: "No fue posible terminar la operacion" })
  }
}

//get category by id 
categoryCtrl.getCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.json({ category })
  } catch (error) {
    res.json({ message:"No fue posible terminar la operacion"})
  }
}

//register pay in the db
categoryCtrl.registerCategory = async (req, res) => {
  const {name, description} = req.body;
  try {
    const newCategory = new Category({
      name, 
      description,
    });
    await newCategory.save();
    res.json({ msg: "Categoia creada correctamente" });
  }catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
}

//Update category in the db
categoryCtrl.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try{
    const category = await Category.findByIdAndUpdate(id, {
      name,
      description,
    });
    res.json({msg: "Categotia actualizada con coorectamente", category});
  }catch (error) {
    res.json({ message: "No fue posible terminar la operacion" });
  }
}

//active category in the db
categoryCtrl.activateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, { status: 0});
    res.json({ msg: "Categoria activada coorectamente ", category});
  }catch (error) {
    res.json({ message: "No fue posible terminar la operacion"});
  }
}

//inactive category in the db
categoryCtrl.inactivateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, { status: 1});
    res.json({ msg: "Categoria inactivada correctamente ", category});
  }catch (error) {
    res.json({ message: "No fue posible terminar la operacion"});
  }
}

 export { categoryCtrl };