import { Request, Response } from "express";
import Compound from "../models/compound";

export async function listCompounds(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const compounds = await Compound.getAllCompounds();
    res.json({ compounds });
  } catch (error) {
    res.status(500).json({ message: "Error fetching compounds", error });
  }
}
