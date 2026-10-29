import express from "express";
import userController from "./controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import issueController from "./controllers/issueController.js";

const router = express.Router();


router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);


router.post(`/issue`, authMiddleware, issueController.create);
router.patch(`/issue/:id`, authMiddleware, issueController.update);
router.delete(`/issue/:id`, authMiddleware, issueController.delete);

router.get(`/issue`, authMiddleware, issueController.getAll);
router.get(`/issue/:id`, authMiddleware, issueController.getById);

export default router