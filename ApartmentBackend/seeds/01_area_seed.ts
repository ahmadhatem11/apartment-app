import type { Knex } from "knex";
import { area } from "./data/area_data";
export async function seed(knex: Knex): Promise<void> {
  await knex("area").del();
  await knex("area").insert(area);
}
