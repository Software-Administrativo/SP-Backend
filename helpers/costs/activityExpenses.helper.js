import ActivityExpenses from "../../models/costs/activityExpenses.js"
const activityExpensesHelper = {};

activityExpensesHelper.validateExistActivityExpensesById = async (id) => {
  try{
    const activityExpenses = await ActivityExpenses.findById(id);
    if (!activityExpenses){
      throw new Error();
    }
  }catch (error){
    throw new Error ( `El gasto de actividad con el id ${id} no existe`);
  }
};
export { activityExpensesHelper};
