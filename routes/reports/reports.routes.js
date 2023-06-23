import { Router } from "express";
import { reportCtrl } from "../../controller/reports/reports.controller.js";
import { reportVali } from "../../validations/reports/reports.validation.js";


const {
    validateOrdersYear,
    validateReportYearMonth,
    validateToken
} = reportVali;

const {
    getInventory,
    getOrdersYear,
    reportYearMonth,
    annualReport,
    getDataMonth
} = reportCtrl;

const routerReport = Router();

routerReport.get("/currentmonth", validateToken, getDataMonth);
routerReport.get("/getinventory", validateToken, getInventory);
routerReport.post("/allordersyear", validateOrdersYear, getOrdersYear);
routerReport.post("/reportyearmonth", validateReportYearMonth, reportYearMonth);
routerReport.post("/annualreport", validateOrdersYear, annualReport);


export { routerReport };
