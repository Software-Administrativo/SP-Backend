import Client from "../../models/maintenance/Client.js";

const clientCtrl = {};

//get all clients
clientCtrl.getClients = async (req, res) => {
  const { farm } = req.headers;
  try {
    const client = await Client.find({ farm });
    res.json({ client });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//search client by name
clientCtrl.searchClient = async (req, res) => {
  const { farm } = req.headers;
  const { name } = req.query;
  try {
    const client = await Client.find({
      farm,
      name: { $regex: name, $options: "i" },
    });
    res.json({ client });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//get client by id in the db
clientCtrl.getClientId = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    res.json({ client });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//register client in the db
clientCtrl.registerClient = async (req, res) => {
  const { name, phone, email, document, address } = req.body;
  const { farm } = req.headers;
  try {
    const newClient = new Client({
      name,
      phone,
      document,
      address,
      farm,
    });
    const client = await newClient.save();
    res.json({ msg: "Cliente creado correctamente", client });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//update client in the db
clientCtrl.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, document, address } = req.body;
  const { farm } = req.headers;
  try {
    await Client.findByIdAndUpdate(id, {
      name,
      phone,
      document,
      address,
      farm,
    });

    const client = await Client.findById(id);
    res.json({ msg: "Cliente actualizado correctamente", client });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//active client in the db
clientCtrl.activeClient = async (req, res) => {
  const { id } = req.params;
  try {
    await Client.findByIdAndUpdate(id, { status: 0 });
    res.json({ msg: "Cliente activado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

//inactive client in the db
clientCtrl.inactiveClient = async (req, res) => {
  const { id } = req.params;
  try {
    await Client.findByIdAndUpdate(id, { status: 1 });
    res.json({ msg: "Cliente inactivado correctamente" });
  } catch (error) {
    res.json({ msg: "No fue posible terminar la operacion" });
  }
};

export { clientCtrl };
