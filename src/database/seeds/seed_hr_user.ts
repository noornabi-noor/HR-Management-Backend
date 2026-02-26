import type { Knex } from "knex";
import bcrypt from "bcrypt";
import { env } from "../../config/env";

export async function seed(knex: Knex): Promise<void> {
  const existing = await knex("hr_users")
    .where({ email: env.ADMIN_EMAIL })
    .first();

  if (existing) {
    console.log("HR user already exists");
    return;
  }

  const password_hash = await bcrypt.hash(env.ADMIN_PASSWORD, 10);

  await knex("hr_users").insert({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password_hash,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });

  console.log("HR user seeded successfully!");
}
