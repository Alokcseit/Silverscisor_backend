import express, { type Application } from "express";
import userRoutes from "./routes/users/user.routes";
import { connectDB } from "./config/database";
import cors from "cors";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
    // this.initErrorHandling();
  }

  public async init(): Promise<void> {
    await connectDB();
  }

  private initMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initRoutes(): void {
    this.app.use("/users", userRoutes);
  }

  // private initErrorHandling(): void {
  //   this.app.use(errorMiddleware);
  // }
}
