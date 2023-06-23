import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database.js";
import morgan from "morgan";

import { routerUsers } from "./routes/user/users.routes.js";

import { routerLots } from "./routes/maintenance/lots.routes.js";
import { routerFarm } from "./routes/maintenance/farm.routes.js";
import { routerStages } from "./routes/maintenance/stages.routes.js";
import { routerPeople } from "./routes/maintenance/people.routes.js";
import { routerPays } from "./routes/maintenance/pays.routes.js";
import { routerSpents } from "./routes/maintenance/spents.routes.js";
import { routerWorks } from "./routes/maintenance/works.routes.js";
import { routerUnitTypes } from "./routes/maintenance/unitTypes.routes.js";
import { routerEps } from "./routes/maintenance/eps.routes.js";
import { routerTypeDocument } from "./routes/maintenance/typeDocument.routes.js";
import { routerClient } from "./routes/maintenance/client.routes.js";

//inventory
import { routerCellars } from "./routes/inventory/cellars.routes.js";
import { routerCategory } from "./routes/inventory/category.routes.js";
import { routerMark } from "./routes/inventory/mark.routes.js";
import { routerProduct } from "./routes/inventory/product.routes.js"; 

// costs 
import {routerActivityExpenses} from "./routes/costs/activityExpenses.routes.js";
import {routerAdminExpenses} from "./routes/costs/adminExpenses.routes.js";
import {routerCosts} from "./routes/costs/costsPlanting.routes.js";
import {routerTypeExpenses} from "./routes/costs/typeExpenses.routes.js";

import { routerOrder } from "./routes/orders/orders.routes.js";

import { routerModelTrans } from "./routes/transformation/modelTrans.routes.js";
import { routerCostTrans } from "./routes/transformation/costTrans.routes.js";

import { routerReport } from "./routes/reports/reports.routes.js";

dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
    this.conexionBd();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      cors({
        handlePreflightRequest: (req, res) => {
          const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true,
          };
          res.writeHead(200, headers);
          res.end();
        },
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(express.static('public'))
  }

  routes() {
/*     this.app.get("/", (req, res) => {
      res.send("Hello World!");
    }); */
    this.app.use("/api/users", routerUsers);


    this.app.use("/api/maintenance/pays", routerPays);
    this.app.use("/api/maintenance/spents", routerSpents);
    this.app.use("/api/maintenance/works", routerWorks);
    this.app.use("/api/maintenance/unittypes", routerUnitTypes);
    this.app.use("/api/maintenance/eps",routerEps);
    this.app.use("/api/maintenance/typedocument", routerTypeDocument);
    this.app.use("/api/maintenance/lots", routerLots);
    this.app.use("/api/maintenance/farm", routerFarm);
    this.app.use("/api/maintenance/stage", routerStages);
    this.app.use("/api/maintenance/people", routerPeople);

    //inventory
    this.app.use("/api/inventory/cellar", routerCellars);
    this.app.use("/api/inventory/category", routerCategory);
    this.app.use("/api/inventory/mark", routerMark);
    this.app.use("/api/inventory/product", routerProduct); 
    
    //costs
    this.app.use("/api/costs/activityExpenses",routerActivityExpenses);
    this.app.use("/api/costs/adminExpenses",routerAdminExpenses);
    this.app.use("/api/costs/costsPlanting",routerCosts);
    this.app.use("/api/costs/typeExpenses",routerTypeExpenses);

    this.app.use("/api/maintenance/client", routerClient);

    this.app.use("/api/orders", routerOrder);

    this.app.use("/api/transformation/modeltrans", routerModelTrans);
    this.app.use("/api/transformation/costtrans", routerCostTrans);

    this.app.use("/api/reports", routerReport);

    this.app.use("*", (req, res) => {
      res.status(404).json({
        msg: "Page not found",
      });
    });
  }

  async conexionBd() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}!`);
    });
  }
}

export default Server;
