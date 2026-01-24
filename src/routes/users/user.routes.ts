import express from "express";
import { UserController } from "../../controllers/users/user..controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { adminMiddleware } from "../../middleware/adminMiddleware";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:userId", authMiddleware(), UserController.getUserById);
router.delete(
  "/:userId",
  authMiddleware(),
  adminMiddleware,
  UserController.deleteUser,
);

export default router;
