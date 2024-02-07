import express from "express";
import nunjucks from "nunjucks";

import whatsappRouter from "./routes/whatsappRouter.js";

const app = express();

nunjucks.configure("./", {
  autoescape: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/meta_wa_callbackurl", whatsappRouter);

export default app;
