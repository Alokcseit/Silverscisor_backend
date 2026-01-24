import "dotenv/config";
import { App } from "./app";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const appInstance = new App();

  await appInstance.init();

  appInstance.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
