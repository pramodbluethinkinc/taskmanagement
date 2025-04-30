import express from "express";

import tasks from "./tasks";
import status from "./status";

const router = express.Router();

// Api Endpoints
router.use("/tasks", tasks);
router.use("/status", status);

export default router;
