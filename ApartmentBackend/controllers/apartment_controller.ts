import { Request, Response } from "express";
import Apartment from "../models/apartment";
import { createNewApartment } from "../services/apartment_service";
import { createApartmentInput } from "../validator/apartment";

export async function listApartments(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const apartments = await Apartment.getAllApartments();

    res.json({ apartments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartments", error });
  }
}

export async function getApartment(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const apartment = await Apartment.getApartmentById(id);
    if (apartment) {
      res.json({ apartment });
    } else {
      res.status(404).send("Apartment not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartment", error });
  }
}

export async function createApartment(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { error, value } = createApartmentInput.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const newApartment = await createNewApartment(req.body);
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ message: "Error creating apartment", error });
  }
}
