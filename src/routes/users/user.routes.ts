import { Router } from "express";
import { UserController } from "../../controllers/users/user..controller";

const router = Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
// router.get("/:id", UserController.getUser);
// router.delete("/:id", UserController.deleteUser);

export default router;
