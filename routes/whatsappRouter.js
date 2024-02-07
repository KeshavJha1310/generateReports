import { Router } from "express";

import webhookConnectionController from "../controllers/webhookConnectionController.js";
import whatsappMessageController from "../controllers/whatsappMessageController.js";

const router = Router();

router
  .route("/")
  .get(webhookConnectionController)
  .post(whatsappMessageController);

export default router;
