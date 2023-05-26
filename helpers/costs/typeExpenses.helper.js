import TypeExpenses from "../../models/costs/typeExpenses.js"
const typeExpensesHelper = {};

typeExpensesHelper.validateExistTypeExpensesById = async (id) => {
  try {
    const typeExpenses = await TypeExpenses.findById(id);
    if (!typeExpenses){
      throw new Error();
      }
    }catch (error) {
        throw new Error (`El tipo de gatos con el id ${id} no existe`);
    }
  };
  export { typeExpensesHelper };