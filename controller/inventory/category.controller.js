import Category from "../../models/inventory/Category.js"
const categoryCtrl = {};

//get all category
categoryCtrl.getCategory = async (req, res) => {
  try {
    const category = await Category.find({ status: 0 });
    res.json({category});
  }catch (error) {
    res.json({message: "Pailas"})
  }
}

//get category by id 


