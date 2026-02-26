import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable("attendance");
  if (!exists) {
    await knex.schema.createTable("attendance", (table) => {
      table.increments("id").primary();
      table.integer("employee_id").notNullable().references("id").inTable("employees").onDelete("CASCADE");
      table.date("date").notNullable();
      table.time("check_in_time").notNullable();
      table.unique(["employee_id", "date"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("attendance");
}