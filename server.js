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

import { routerCellars } from "./routes/inventory/cellars.routes.js";
import { routerCategory } from "./routes/inventory/category.routes.js";
import { routerMark } from "./routes/inventory/mark.routes.js";
import { routerProduct } from "./routes/inventory/product.routes.js"; 


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
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    this.app.use("/users", routerUsers);
     this.app.use("/inventory/cellar", routerCellars);
    this.app.use("/inventory/category", routerCategory);
    this.app.use("/inventory/mark", routerMark);
    this.app.use("/inventory/product", routerProduct); 
    this.app.use("/maintenance/pays", routerPays);
    this.app.use("/maintenance/spents", routerSpents);
    this.app.use("/maintenance/works", routerWorks);
    this.app.use("/maintenance/unittypes", routerUnitTypes);
    this.app.use("/maintenance/eps",routerEps);
    this.app.use("/maintenance/typedocument", routerTypeDocument);
    this.app.use("/maintenance/lots", routerLots);
    this.app.use("/maintenance/farm", routerFarm);
    this.app.use("/maintenance/stage", routerStages);
    this.app.use("/maintenance/people", routerPeople);
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
