import Mark from "../../models/inventory/Mark.js";

const markCtrl = {};

//get all marks
markCtrl.getMarks = async (req, res) => {
    
    try {
        const mark = await Mark.find();
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
    const { name,farm,category,description } = req.body;
    try {
        const newMark = new Mark({
            name,
            farm,
            category,
            description
        });
    await newMark.save();
    res.json({ msg: "Marca creada correctamente" });
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//update mark in the db
markCtrl.updateMark = async (req, res) => {
    const { id } = req.params;
    const { name,farm,category,description,  } = req.body;
    try {
        await Mark.findByIdAndUpdate(id, {
            name,
            farm,
            category,
            description,    
        });
        const mark = await Mark.findById(id);
        res.json({ msg: "Marca actualizado correctamente" , mark});
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}


//activate mark in the db
markCtrl.activateMark = async (req, res) => {
    const { id } = req.params;
    try {
        await Mark.findByIdAndUpdate(id, { status: 0 });
        res.json({ msg: "Marca activada correctamente" });
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}

//inactive mark in the db
markCtrl.inactiveMark = async (req, res) => {
    const { id } = req.params;
    try {
        await Mark.findByIdAndUpdate(id, { status: 1 });
        res.json({ msg: "Marca inactivada correctamente" });
    }catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
}


export { markCtrl };