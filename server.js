import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database.js";
import morgan from "morgan";
import { routerUsers } from "./routes/users.routes.js";
import { routerPays } from "./routes/maintenance/pays.routes.js";
import { routerCosts } from "./routes/maintenance/costs.routes.js";
import { routerWorks } from "./routes/maintenance/works.routes.js";
import { routerUnitTypes } from "./routes/maintenance/unitTypes.routes.js";

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
    this.app.use("/maintenance/pays", routerPays);
    this.app.use("/maintenance/costs", routerCosts);
    this.app.use("/maintenance/works", routerWorks);
    this.app.use("/maintenance/unittypes", routerUnitTypes);
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
