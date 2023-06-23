

import Client from "../../models/maintenance/Client.js";
const clientHelper = {};

clientHelper.validateExistClientById = async (id) => {
    try {
        const client = await Client.findById(id);
        if (!client) {
            throw new Error();
        }
    } catch (error) {
        throw new Error(`El client con el id ${id} no existe`);
    }
};


clientHelper.validateUniquePhone = async (phone, id = null, farm) => {
    try {
        const client = await Client.findOne({ phone, farm });
        if (client) {
            if (id) {
                if (client._id.toString() !== id.toString()) {
                    throw new Error();
                }
            } else {
                throw new Error();
            }
        }
    }
    catch (error) {
        throw new Error(`El telefono ${phone} ya se encuentra registrado`);
    }
};


/* clientHelper.validateEmail = (email) => {
    const reg = /\S+@\S+\.\S+/;
    if (!reg.test(email)) {
        throw new Error(`El email ${email} no es valido`);
    }
};

clientHelper.validateUniqueEmail = async (email, id = null) => {
    try {
        const client = await Client.findOne({ email });
        if (client) {
            if (id) {
                if (client._id.toString() !== id.toString()) {
                    throw new Error();
                }
            } else {
                throw new Error();
            }
        }
    }catch (error) {
        throw new Error(`El email ${email} ya se encuentra registrado`);
    }
}; */


clientHelper.validateUniqueDocument = async (document, id = null, farm) => {
    try {
        const client = await Client.findOne({ document, farm });
        if (client) {
            if (id) {
                if (client._id.toString() !== id.toString()) {
                    throw new Error();
                }
            } else {
                throw new Error();
            }
        }
    }catch (error) {
        throw new Error(`El documento ${document} ya se encuentra registrado`);
    }
};

export { clientHelper };
