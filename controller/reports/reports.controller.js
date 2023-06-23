import mongoose from "mongoose";

import Order from "../../models/orders/Order.js";
import Farm from "../../models/maintenance/Farm.js";
import ActivityExpenses from "../../models/costs/activityExpenses.js";
import CostTrans from "../../models/transformation/CostTrans.js";
import CostsPlanting from "../../models/costs/CostsPlanting.js";
import adminExpenses from "../../models/costs/adminExpenses.js";
import Product from "../../models/inventory/Product.js";

const reportCtrl = {};

//get all orders by year
//cuantity of order by month of the year selected
reportCtrl.getOrdersYear = async (req, res) => {
  const { year } = req.body;
  const { farm } = req.headers;

  try {
    const farmSearch = await Farm.findById(farm);
    const farmName = farmSearch.name;

    const orders = await Order.find({
      farm,
      createdAt: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`),
      },
      status: 0,
    }).sort({ createdAt: 1 });

    if (!orders) {
      return res.status(400).json({ msg: "No existen pedidos para ese año" });
    }

    let totalOrdersPay = 0;
    let totalOrdersPending = 0;
    let totalOrdersCancel = 0;
    let allorders = [];

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].statuspay === "PAGADO") {
        totalOrdersPay += 1;
      } else if (orders[i].statuspay === "PENDIENTE") {
        totalOrdersPending += 1;
      } else if (orders[i].statuspay === "CANCELADO") {
        totalOrdersCancel += 1;
      }
    }

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    for (let i = 0; i < 12; i++) {
      const monthOrders = orders.filter(
        (order) => order.createdAt.getMonth() === i
      );
      const totalOrders = monthOrders.length;
      const totalOrdersPayMonth = monthOrders.filter(
        (order) => order.statuspay === "PAGADO"
      ).length;
      const totalOrdersPendingMonth = monthOrders.filter(
        (order) => order.statuspay === "PENDIENTE"
      ).length;
      const totalOrdersCancelMonth = monthOrders.filter(
        (order) => order.statuspay === "CANCELADO"
      ).length;

      allorders.push({
        month: months[i],
        totalOrders: totalOrders,
        totalOrdersPay: totalOrdersPayMonth,
        totalOrdersPending: totalOrdersPendingMonth,
        totalOrdersCancel: totalOrdersCancelMonth,
      });
    }

    const report = {
      nameFarm: farmName,
      year: year,
      totalOrdersPay: totalOrdersPay,
      totalOrdersPending: totalOrdersPending,
      totalOrdersCancel: totalOrdersCancel,
      total: totalOrdersCancel + totalOrdersPay + totalOrdersPending,
      allorders: allorders,
    };

    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

//earnings reports within selected dates
reportCtrl.reportYearMonth = async (req, res) => {
  const { fstart, fend } = req.body;
  const { farm } = req.headers;
  let fStart = `${fstart}T00:00:00.000-05:00`;
  let fEnd = `${fend}T23:59:59.000-05:00`;

  try {
    //search all activities within the selected dates and go summing the total of each activity

    const activityExpenses = await ActivityExpenses.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(fStart),
            $lte: new Date(fEnd),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: "$farm",
          total: { $sum: "$worth" },
        },
      },
    ]);

    //search all costs of transformation within the selected dates
    const transformationCosts = await CostTrans.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(fStart),
            $lte: new Date(fEnd),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: "$farm",
          total: { $sum: "$cost" },
        },
      },
    ]);

    //search all costs of plantation within the selected dates
    const plantationCosts = await CostsPlanting.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(fStart),
            $lte: new Date(fEnd),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: "$farm",
          total: { $sum: "$worth" },
        },
      },
    ]);

    //search all administrative expenses within the selected dates
    const administrativeExpenses = await adminExpenses.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(fStart),
            $lte: new Date(fEnd),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: "$farm",
          total: { $sum: "$worth" },
        },
      },
    ]);

    //search all orders within the selected dates and status 0 and statuspay = PAGADO

    const orders = await Order.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          dateorder: {
            $gte: new Date(fStart),
            $lte: new Date(fEnd),
          },
          status: 0,
          statuspay: "PAGADO",
        },
      },
      {
        $group: {
          _id: "$farm",
          total: { $sum: "$total" },
        },
      },
    ]);

    console.log(orders);
    console.log(activityExpenses[0])

    const totalActi = activityExpenses[0] ? activityExpenses[0].total : 0;
    const totalTrans = transformationCosts[0] ? transformationCosts[0].total : 0;
    const totalPlant = plantationCosts[0] ? plantationCosts[0].total : 0;
    const totalAdmin = administrativeExpenses[0] ? administrativeExpenses[0].total : 0;
    const totalOrde = orders[0] ? orders[0].total : 0;

    res.status(200).json({
      msg: "Reporte generado con exito",
      totalActivityExpenses: totalActi,
      totalTransformationCosts: totalTrans,
      totalPlantationCosts: totalPlant,
      totalAdministrativeExpenses: totalAdmin,
      totalOrders: totalOrde,
      totalCosts:
        totalTrans +
        totalPlant +
        totalAdmin,
      totalEarnings:
      totalOrde -
          (totalTrans +
            totalPlant +
            totalAdmin),
      porcentEarnings:
        ((orders[0] ? orders[0].total : 0 -
          (totalTrans +
            totalPlant +
            totalAdmin)) /
          orders[0] ? orders[0].total : 1) *
        100,

    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

reportCtrl.annualReport = async (req, res) => {
  const { farm } = req.headers;
  const { year } = req.body;
  let dataSend = [];

  const branches = [
    { case: { $eq: ["$_id", 1] }, then: "ENERO" },
    { case: { $eq: ["$_id", 2] }, then: "FEBRERO" },
    { case: { $eq: ["$_id", 3] }, then: "MARZO" },
    { case: { $eq: ["$_id", 4] }, then: "ABRIL" },
    { case: { $eq: ["$_id", 5] }, then: "MAYO" },
    { case: { $eq: ["$_id", 6] }, then: "JUNIO" },
    { case: { $eq: ["$_id", 7] }, then: "JULIO" },
    { case: { $eq: ["$_id", 8] }, then: "AGOSTO" },
    { case: { $eq: ["$_id", 9] }, then: "SEPTIEMBRE" },
    { case: { $eq: ["$_id", 10] }, then: "OCTUBRE" },
    { case: { $eq: ["$_id", 11] }, then: "NOVIEMBRE" },
    { case: { $eq: ["$_id", 12] }, then: "DICIEMBRE" },
  ];

  try {
    //buscar todas las actividades de gastos del año seleccionado, pero crear un array por cada mes
    const activityExpenses = await ActivityExpenses.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-12-31T23:59:59.000-05:00`),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: branches,
              default: "OTRO MES",
            },
          },
          total: 1,
        },
      },
    ]);

    //buscar todos los costos de transformacion del año seleccionado, pero crear un array por cada mes
    const transformationCosts = await CostTrans.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-12-31T23:59:59.000-05:00`),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: branches,
              default: "OTRO MES",
            },
          },
          total: 1,
        },
      },
    ]);

    //buscar todos los costos de plantacion del año seleccionado, pero crear un array por cada mes
    const plantationCosts = await CostsPlanting.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-12-31T23:59:59.000-05:00`),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: branches,
              default: "OTRO MES",
            },
          },
          total: 1,
        },
      },
    ]);

    //buscar todos los gastos administrativos del año seleccionado, pero crear un array por cada mes
    const administrativeExpenses = await adminExpenses.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-12-31T23:59:59.000-05:00`),
          },
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: branches,
              default: "OTRO MES",
            },
          },
          total: 1,
        },
      },
    ]);

    //buscar todas las ordenes del año seleccionado, pero crear un array por cada mes
    const orders = await Order.aggregate([
      {
        $match: {
          farm: new mongoose.Types.ObjectId(farm),
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-12-31T23:59:59.000-05:00`),
          },
          status: 0,
          statuspay: "PAGADO",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$total" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: branches,
              default: "OTRO MES",
            },
          },
          total: 1,
        },
      },
    ]);

    //generar un array con todos los meses del año
    const months = [
      { month: "ENERO" },
      { month: "FEBRERO" },
      { month: "MARZO" },
      { month: "ABRIL" },
      { month: "MAYO" },
      { month: "JUNIO" },
      { month: "JULIO" },
      { month: "AGOSTO" },
      { month: "SEPTIEMBRE" },
      { month: "OCTUBRE" },
      { month: "NOVIEMBRE" },
      { month: "DICIEMBRE" },
    ];

    //ir recorriendo el array de meses y agregando el objeto de cada mes a cada array de gastos
    for (let i = 0; i < months.length; i++) {
      const month = months[i];

      const activity = activityExpenses.find(
        (activity) => activity.month === month.month
      );
      const transformation = transformationCosts.find(
        (transformation) => transformation.month === month.month
      );
      const plantation = plantationCosts.find(
        (plantation) => plantation.month === month.month
      );
      const administrative = administrativeExpenses.find(
        (administrative) => administrative.month === month.month
      );
      const order = orders.find((order) => order.month === month.month);

      console.log("activity", activity);
      const resultActi = activity ? activity.total : 0;
      const resultTrans = transformation ? transformation.total : 0;
      const resultPlant = plantation ? plantation.total : 0;
      const resultAdmin = administrative ? administrative.total : 0;
      const resultOrder = order ? order.total : 0;

      const totalIncome = resultOrder;
      const totalExpenses =
        resultActi + resultTrans + resultPlant + resultAdmin;
      const resultUtility = totalIncome - totalExpenses;
      const porcentUtility =
        totalIncome !== 0 ? (resultUtility / Math.abs(totalIncome)) * 100 : 0;
      const porcentExpenses =
        totalIncome !== 0 ? (totalExpenses / Math.abs(totalIncome)) * 100 : 0;
      dataSend.push({
        month: month.month,
        activity: resultActi,
        transformation: resultTrans,
        plantation: resultPlant,
        administrative: resultAdmin,
        order: resultOrder,
        totalincome: totalIncome,
        totalexpenses: totalExpenses,
        utility: resultUtility,
        porcentutility: isNaN(porcentUtility) ? 0 : porcentUtility,
        porcentexpends: isNaN(porcentExpenses) ? 0 : porcentExpenses,
      });
    }

    res.status(200).json(dataSend);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};

reportCtrl.getInventory = async (req, res) => {
  const { farm } = req.headers;
  try {
    const inventory = await Product.find({ farm, status: 0 })
      .populate("category")
      .populate("mark")
      .populate("farm");
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }

};

//reporte desglosado de los gastos de la finca por mes
reportCtrl.getReportDesglose = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};


//report current month
reportCtrl.getDataMonth = async (req, res) => {
  const { farm } = req.headers;
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

    console.log("year", year);
    console.log("month", month);

    const branches = [
      { case: { $eq: ["$_id", 1] }, then: "ENERO" },
      { case: { $eq: ["$_id", 2] }, then: "FEBRERO" },
      { case: { $eq: ["$_id", 3] }, then: "MARZO" },
      { case: { $eq: ["$_id", 4] }, then: "ABRIL" },
      { case: { $eq: ["$_id", 5] }, then: "MAYO" },
      { case: { $eq: ["$_id", 6] }, then: "JUNIO" },
      { case: { $eq: ["$_id", 7] }, then: "JULIO" },
      { case: { $eq: ["$_id", 8] }, then: "AGOSTO" },
      { case: { $eq: ["$_id", 9] }, then: "SEPTIEMBRE" },
      { case: { $eq: ["$_id", 10] }, then: "OCTUBRE" },
      { case: { $eq: ["$_id", 11] }, then: "NOVIEMBRE" },
      { case: { $eq: ["$_id", 12] }, then: "DICIEMBRE" },
    ];
    const activityExpenses = await ActivityExpenses.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-${month}-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-${month}-31T23:59:59.000-05:00`),
          },
          farm: new mongoose.Types.ObjectId(farm),
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },

    ]);

    console.log("activityExpenses", activityExpenses);

    const transformationCosts = await CostTrans.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-${month}-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-${month}-31T23:59:59.000-05:00`),
          },
          farm: new mongoose.Types.ObjectId(farm),
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },

    ]);

    const plantationCosts = await CostsPlanting.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-${month}-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-${month}-31T23:59:59.000-05:00`),
          },
          farm: new mongoose.Types.ObjectId(farm),
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },
    ]);

    const administrativeCosts = await adminExpenses.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-${month}-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-${month}-31T23:59:59.000-05:00`),
          },
          farm: new mongoose.Types.ObjectId(farm),
          status: 0,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$worth" },
        },
      },
    ]);

    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-${month}-01T00:00:00.000-05:00`),
            $lte: new Date(`${year}-${month}-31T23:59:59.000-05:00`),
          },
          farm: new mongoose.Types.ObjectId(farm),
          status: 0,
          statuspay: "PAGADO",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$total" },
        },
      },
    ]);


    const totalActivityExpenses = activityExpenses.reduce(
      (acc, item) => acc + item.total,
      0
    );

    const totalTransformationCosts = transformationCosts.reduce(
      (acc, item) => acc + item.total,
      0
    );

    const totalPlantationCosts = plantationCosts.reduce(
      (acc, item) => acc + item.total,
      0
    );

    const totalAdministrativeCosts = administrativeCosts.reduce(
      (acc, item) => acc + item.total,
      0
    );

    const totalOrders = orders.reduce((acc, item) => acc + item.total, 0);


    const totalCosts =
      totalActivityExpenses +
      totalTransformationCosts +
      totalPlantationCosts +
      totalAdministrativeCosts;

    const data = {
      totalActivityExpenses,
      totalTransformationCosts,
      totalPlantationCosts,
      totalAdministrativeCosts,
      totalCosts,
      totalOrders,
    };

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No fue posible terminar la operacion" });
  }
};


export { reportCtrl };
