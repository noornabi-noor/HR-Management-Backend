import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable("hr_users");
  if (!exists) {
    await knex.schema.createTable("hr_users", (table) => {
      table.increments("id").primary();
      table.string("email", 200).notNullable().unique();
      table.string("name", 150).notNullable();
      table.string("password_hash").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("hr_users");
}
