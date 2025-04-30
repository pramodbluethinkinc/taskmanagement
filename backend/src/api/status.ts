import express from "express";
import pool from "../utils/db";
import { filterStatusDataByRole, getUserInfo } from "../utils/keycloakHelper";

const router = express.Router();

type Status = {
  id: number;
  description: string;
};

type StatusResponse = Status[];

router.get<{}, StatusResponse>("/", async (req: any, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT
          STATUS_ID AS "id",
          STATUS_NAME AS "description"
      FROM STATUS
      ORDER BY STATUS_NAME;`
    );
    res.json(filterStatusDataByRole(rows, getUserInfo(req)));
  } catch (error) {
    next(error);
  }
});

export default router;
