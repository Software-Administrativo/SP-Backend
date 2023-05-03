import Mark from "../../models/inventory/Mark.js";

const markCtrl = {};

//get all marks
markCtrl.getMarks = async (req, res) => {
    try {
        const mark = await Mark.find({ status: 0 });
        res.json({ mark });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//get mark by id in the db
markCtrl.getMarkId = async (req, res) => {
    const { id } = req.params;
    try {
        const mark = await Mark.findById(id);
        res.json({ mark });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//register mark in the db
markCtrl.registerMark = async (req, res) => {
    const { name,finca,description,valor } = req.body;
    try {
        const newMark = new Mark({
            name,
            finca,
            description,
            valor,
        });
    await newMark.save();
    res.json({ msg: "MArca creada correctamente" });
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//update mark in the db
markCtrl.updateMark = async (req, res) => {
    const { id } = req.params;
    const { name,finca,description,valor } = req.body;
    try {
        const mark = await Mark.findByIdAndUpdate(id, {
            name,
            finca,
            description,
            valor,
        });
        res.json({ msg: "Marca actualizado correctamente" , mark});
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}


//activate mark in the db
markCtrl.activateMark = async (req, res) => {
    const { id } = req.params;
    try {
        const mark = await Mark.findByIdAndUpdate(id, { status: 0 });
        res.json({ msg: "Marca activada correctamente" , mark});
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//inactive mark in the db
markCtrl.inactiveMark = async (req, res) => {
    const { id } = req.params;
    try {
        const mark = await Mark.findByIdAndUpdate(id, { status: 1 });
        res.json({ msg: "Marca inactivada correctamente" , mark});
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}


export { markCtrl };