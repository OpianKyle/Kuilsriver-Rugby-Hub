import { Prisma } from "@prisma/client";
import { GetFundraisingSummaryResponse } from "@workspace/api-zod";
import { Router, type IRouter } from "express";
import { prisma } from "../lib/mysql";

const router: IRouter = Router();
const FUNDRAISING_GOAL_RAND = 250_000;

router.get("/fundraising/summary", async (req, res): Promise<void> => {
  try {
    const totals = await prisma.donation.aggregate({
      where: { status: "CONFIRMED" },
      _sum: { amountCents: true },
      _count: { _all: true },
    });

    const raisedAmount = (totals._sum.amountCents ?? 0) / 100;
    const data = GetFundraisingSummaryResponse.parse({
      goalAmount: FUNDRAISING_GOAL_RAND,
      raisedAmount,
      progressPercent: Math.min(
        100,
        (raisedAmount / FUNDRAISING_GOAL_RAND) * 100,
      ),
      verifiedDonationCount: totals._count._all,
    });

    res.json(data);
  } catch (error) {
    const code =
      error instanceof Prisma.PrismaClientKnownRequestError
        ? error.code
        : "DATABASE_UNAVAILABLE";
    req.log.error({ code }, "Unable to load fundraising totals");
    res.status(503).json({ error: "Fundraising totals are temporarily unavailable" });
  }
});

export default router;
