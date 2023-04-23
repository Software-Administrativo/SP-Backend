import Cellar from "../../models/inventory/Cellar.js"
const cellarCtrl = {};

//get all cellar
cellarCtrl.getCellar = async (req, res) => {
    try {
        const cellar = await Cellar.find({ status: 0 });
        res.json({cellar});
    }catch (error) {
        res.json({message:"No fue posible terminar la operacion" })
    }
}

//get cellar by id
cellarCtrl.getCellarId = async (req, res) => {
    const { id } = req.params;
    try {
      const cellar = await Cellar.findById(id);
      res.json({ cellar })
    } catch (error) {
      res.json({ message:"No fue posible terminar la operacion"})
    }
  }

//register cellar in the db
cellarCtrl.registerCellar = async (req, res) => {
    const { name,finca,tpcontrato,description,valor } = req.body;
    try {
        const newCellar = new Cellar({
            name,
            finca,
            tpcontrato,
            description,
            valor,
        });
    await newCellar.save();
    res.json({ msg: "Bodega creada correctamente" });
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}

//update cellar in the db
cellarCtrl.updateCellar = async (req, res) => {
    const { id } = req.params;
    const { name,finca,tpcontrato,description,valor } = req.body;
    try {
        const cellar = await Cellar.findByIdAndUpdate(id, {
            name,
            finca,
            tpcontrato,
            description,
            valor,
        });
        res.json({ msg: "Bodega actualizado correctamente" , cellar});
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}

//activate cellar in the db
cellarCtrl.activateCellar = async (req, res) => {
    const { id } = req.params;
    try {
        const cellar = await Cellar.findByIdAndUpdate(id, { status: 0 });
        res.json({ msg: "Bodega activado correctamente" , cellar});
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}

//inactive cellar in the db
cellarCtrl.inactiveCellar = async (req, res) => {
    const { id } = req.params;
    try {
        const cellar = await Cellar.findByIdAndUpdate(id, { status: 1 });
        res.json({ msg: "Bodega inactivado correctamente" , cellar});
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
} 

export { cellarCtrl }