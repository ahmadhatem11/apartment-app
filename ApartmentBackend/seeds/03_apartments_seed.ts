import type { Knex } from "knex";
import { apartments } from "./data/apartments_data";

export async function seed(knex: Knex): Promise<void> {
  await knex("image").del();
  await knex("apartment").del();

  for (const apartmentData of apartments) {
    const { images, ...apartment } = apartmentData;
    const [{ id }] = await knex("apartment").insert(apartment).returning("id");

    if (images && images.length) {
      const imageEntries = images.map((img) => ({
        apartment_id: id,
        image_url: img,
      }));

      await knex("image").insert(imageEntries);
    }
  }
}
