import * as dotenv from "dotenv";
import { App } from "./app";
dotenv.config();

const PORT = process.env.PORT;

const server = new App();

server.app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
