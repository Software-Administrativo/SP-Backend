import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database.js";
import morgan from "morgan";
import { routerUsers } from "./routes/users.routes.js";
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
    this.app.use("/users", routerUsers);
    this.app.use("inventory/cellar", routerCellars);
    this.app.use("inventory/category", routerCategory);
    this.app.use("inventory/mark", routerMark);
    this.app.use("inventory/product", routerProduct);

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
