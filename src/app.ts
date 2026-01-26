import express, { type Application } from "express";
import userRoutes from "./routes/users/user.routes";
import authRoutes from "./routes/auth/auth.routes";
import { connectDB } from "./config/database";
import cors from "cors";
import { pool, sqlDBConnection } from "./config/mysql.database";

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
    await sqlDBConnection();
  }

  private initMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initRoutes(): void {
    this.app.use("/api/v1/users", userRoutes);
    this.app.use("/api/v1/auth", authRoutes);
  }
}
