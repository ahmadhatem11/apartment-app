import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("apartment", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.text("description");
    table.integer("unit_area").notNullable();
    table.decimal("price", 9, 2).notNullable();
    table.integer("bedrooms").notNullable();
    table.integer("bathrooms").notNullable();
    table.date("ready_by");
    table.enum("finishing", ["Finished", "Not Finished"]);
    table.integer("area_id").references("area.id");
    table.integer("compound_id").references("compound.id");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("apartment");
}
