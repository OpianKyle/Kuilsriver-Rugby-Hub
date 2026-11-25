import { Router, type IRouter } from "express";
import fundraisingRouter from "./fundraising";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(fundraisingRouter);

export default router;
