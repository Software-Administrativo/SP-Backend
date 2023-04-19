import Pay from "../../models/maintenance/Pay.js";

const paysCtrl = {};

//get all pays
paysCtrl.getPays = async (req, res) => {
    try {
        const pays = await Pay.find({ status: 0 });
        res.json({ pays });
    } catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}

//get pay by id in the db
paysCtrl.getPayId = async (req, res) => {
    const { id } = req.params;
    try {
        const pay = await Pay.findById(id);
        res.json({ pay });
    } catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}

//register pay in the db
paysCtrl.registerPay = async (req, res) => {
    const { name,tpcontrato,description,valor } = req.body;
    try {
        const newPay = new Pay({
            name,
            tpcontrato,
            description,
            valor,
        });
    await newPay.save();
    res.json({ msg: "Pago creado correctamente" });
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}

//update pay in the db
paysCtrl.updatePays = async (req, res) => {
    const { id } = req.params;
    const { name,tpcontrato,description,valor } = req.body;
    try {
        const pay = await Pay.findByIdAndUpdate(id, {
            name,
            tpcontrato,
            description,
            valor,
        });
        res.json({ msg: "Pago actualizado correctamente" , pay});
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}


//activate pay in the db
paysCtrl.activatePays = async (req, res) => {
    const { id } = req.params;
    try {
        const pay = await Pay.findByIdAndUpdate(id, { status: 0 });
        res.json({ msg: "Pago activado correctamente" , pay});
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}

//inactive pay in the db
paysCtrl.inactivePays = async (req, res) => {
    const { id } = req.params;
    try {
        const pay = await Pay.findByIdAndUpdate(id, { status: 1 });
        res.json({ msg: "Pago inactivado correctamente" , pay});
    }catch (error) {
        res.json({ message: "No fue posible terminar la operacion" });
    }
}


export { paysCtrl };
