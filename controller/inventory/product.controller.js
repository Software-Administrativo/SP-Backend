import Product from "../../models/inventory/Poduct.js"

const productCtrl = {};

//get all products
productCtrl.getProduct = async (req, res) => {
    
    try {
        const product = await Product.find({ status: 0 });
        res.json({ product });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//get product by id in the db
productCtrl.getPoductId = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.json({ product });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//register product in the db
productCtrl.registerPoduct = async (req, res) => {
    const { code,name,category,mark,amount,description,valor } = req.body;
    try {
        const newProduct = new Pay({
            code,
            name,
            category,
            mark,
            amount,
            description,
        });
    await newProduct.save();
    res.json({ msg: "Producto creado correctamente" });
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//update product in the db
productCtrl.updatePoduct = async (req, res) => {
    const { id } = req.params;
    const { code,name,category,mark,amount,description,valor } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id,{
            code,
            name,
            category,
            mark,
            amount,
            description,
        });
    res.json({ msg: "Producto actualizado correctamente", product });
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//activate product in the db
productCtrl.activateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, { status: 0 });
        res.json({ msg: "Poducto activado correctamente" , product});
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//inactive product in the db
productCtrl.inactiveProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, { status: 1 });
        res.json({ msg: "Producto inactivado correctamente" , product});
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}
export { productCtrl };