import People from "../../models/maintenance/People.js";

const peopleCtrl = {};

//get all people
peopleCtrl.getPeoples = async (req, res) => {
    const { farm } = req.headers;
    try {
        const people = await People.find({ farm });
        res.json({ people });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
};

//get people by id in the db
peopleCtrl.getPeopleId = async (req, res) => {
    const { id } = req.params;
    try {
        const people = await People.findById(id);
        res.json({ people });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
};

//register people in the db
peopleCtrl.registerPeople = async (req, res) => {
    const { name, tpdct, document, phone, eps, tipePeople } = req.body;
    const { farm } = req.headers;
    try {
        const newPeople = new People({
            name:name.trim().toUpperCase(),
            tpdct,
            document,
            phone,
            eps,
            tipePeople,
            farm,
        });
        const people = await newPeople.save();
        res.json({ msg: "Persona creada correctamente", people });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
};

//update people in the db
peopleCtrl.updatePeoples = async (req, res) => {
    const { id } = req.params;
    const { name, tpdct, document, phone, eps, tipePeople } = req.body;
    const { farm } = req.headers;
    try {
        await People.findByIdAndUpdate(id, {
            name: name.trim().toUpperCase(),
            tpdct,
            document,
            phone,
            eps,
            tipePeople,
            farm,
        });

        const updatePeople = await People.findById(id);
        res.json({ msg: "Persona actualizada correctamente", people: updatePeople });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
};

//active people in the db
peopleCtrl.activePeoples = async (req, res) => {
    const { id } = req.params;
    try {
        await People.findByIdAndUpdate(id, { status: 0 });
        res.json({ msg: "Persona activada correctamente" });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
};

//inactive people in the db
peopleCtrl.inactivePeoples = async (req, res) => {
    const { id } = req.params;
    try {
        await People.findByIdAndUpdate(id, { status: 1 });
        res.json({ msg: "Persona inactivada correctamente" });
    } catch (error) {
        res.json({ msg: "No fue posible terminar la operacion" });
    }
};

export { peopleCtrl };
