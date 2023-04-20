import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database.js";
import morgan from "morgan";
import { routerUsers } from "./routes/users.routes.js";
import { routerPays } from "./routes/maintenance/pays.routes.js";

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
    this.app.use("/users", routerUsers);
    this.app.use("/maintenance/pays", routerPays);
    /* this.app.use("maintenance/category",routerCategory); */
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
