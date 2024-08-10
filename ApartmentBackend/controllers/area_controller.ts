import { Request, Response } from "express";
import Area from "../models/area";

export async function listAreas(req: Request, res: Response): Promise<void> {
  try {
    const areas = await Area.getAllAreas();
    res.json({ areas });
  } catch (error) {
    res.status(500).json({ message: "Error fetching areas", error });
  }
}
