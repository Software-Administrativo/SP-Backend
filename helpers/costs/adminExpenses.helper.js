import AdminExpenses from "../../models/costs/adminExpenses.js";
const adminExpensesHelper = {};

adminExpensesHelper.validateExistAdminExpensesById = async (id) => {
  try {
    const adminExpensesHelper = await AdminExpenses.findById(id);
    if (!adminExpensesHelper){
      throw new Error();
      }
    }catch (error) {
        throw new Error (`El gasto administrativo con el id ${id} no existe`);
    }
  };
  export { adminExpensesHelper };