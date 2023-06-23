import Product from "../../models/inventory/Product.js";
const productCtrl = {};

//get all products
productCtrl.getProduct = async (req, res) => {
  const { farm } = req.headers;
  try {
    const product = await Product.find({ farm });
    res.json({ product });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//get product by id in the db
productCtrl.getPoductId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json({ product });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//register product in the db
productCtrl.registerProduct = async (req, res) => {
    const { name,category,amount,description,mark } = req.body;
    const { farm} = req.headers;
    try {
        const newProduct = new Product({
            name:name.trim().toUpperCase(),
            category,
            amount,
            description:description.trim(),
            mark,
            farm
        });
        //console.log(newProduct);
        const product = await newProduct.save();
    res.json({ msg: "Producto creado correctamente", product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//update product in the db
productCtrl.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name,category,mark,amount,description } = req.body;
    const { farm} = req.headers;
    try {
        await Product.findByIdAndUpdate(id,{
            farm,
            name:name.trim().toUpperCase(),
            category,
            mark,
            amount,
            description:description.trim(),
        });
    const product = await Product.findById(id);
    res.json({ msg: "Producto actualizado correctamente", product });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//activate product in the db
productCtrl.activateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Producto activado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive product in the db
productCtrl.inactiveProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Producto inactivado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};
export { productCtrl };
