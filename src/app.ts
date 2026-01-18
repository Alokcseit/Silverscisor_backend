import express, { Application } from "express";
// import userRoutes from "./routes/user.routes.js";
// import { errorMiddleware } from "./middlewares/error.middleware.js";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    // this.initRoutes();
    // this.initErrorHandling();
  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  //   private initRoutes() {
  //     this.app.use("/api/users", userRoutes);
  //   }

  //   private initErrorHandling() {
  //     this.app.use(errorMiddleware);
  //   }
}
