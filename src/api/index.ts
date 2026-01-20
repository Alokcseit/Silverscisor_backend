import { VercelRequest, VercelResponse } from "@vercel/node";
import "dotenv/config";
import { App } from "../app";

const appInstance = new App();
let isInitialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isInitialized) {
    await appInstance.init();
    isInitialized = true;
  }

  appInstance.app(req, res);
}
