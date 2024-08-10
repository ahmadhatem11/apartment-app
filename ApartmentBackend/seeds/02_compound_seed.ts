import type { Knex } from "knex";
import { compounds } from "./data/compound_data";
export async function seed(knex: Knex): Promise<void> {
  await knex("compound").del();
  await knex("compound").insert(compounds);
}
