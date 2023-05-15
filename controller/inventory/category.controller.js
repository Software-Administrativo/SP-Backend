import Category from "../../models/inventory/Category.js"
const categoryCtrl = {};

//get all category
categoryCtrl.getCategory = async (req, res) => {
  const { farm} = req.headers;
  try {
    const category = await Category.find({farm})
    res.json({category});
  }catch (error) {
    res.json({msg: "No fue posible terminar la operacion" })
  }
}

//get category by id 
categoryCtrl.getCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.json({ category })
  } catch (error) {
    res.json({ msg:"No fue posible terminar la operacion"})
  }
};

//register category in the db
categoryCtrl.registerCategory = async (req, res) => {
  const {name, description} = req.body;
  const { farm} = req.headers;
  try {
    const newCategory = new Category({
      name, 
      description,
      farm,
    });
    const category = await newCategory.save();
    res.json({ msg: "Categoria creada correctamente", category });
  }catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//Update category in the db
categoryCtrl.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { farm} = req.headers;
  try{
    await Category.findByIdAndUpdate(id, {
      name,
      description,
      farm
    });
    const category = await Category.findById(id);
    res.json({msg: "Categoria actualizada con correctamente", category});
  }catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
}

//active category in the db
categoryCtrl.activateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndUpdate(id, { status: 0});
    res.json({ msg: "Categoria activada coorectamente "});
  }catch (error) {
    res.json({ msg: "No fue posible terminar la operacion"});
  }
}

//inactive category in the db
categoryCtrl.inactivateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndUpdate(id, { status: 1});
    res.json({ msg: "Categoria inactivada correctamente "});
  }catch (error) {
    res.json({ msg: "No fue posible terminar la operacion"});
  }
}

 export { categoryCtrl };