import type { Knex } from "knex";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function seed(knex: Knex): Promise<void> {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error("ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD must be set in .env");
  }

  const existing = await knex("hr_users")
    .where({ email })
    .first();

  if (existing) {
    console.log("HR user already exists");
    return;
  }

  const password_hash = await bcrypt.hash(password, 10);

  await knex("hr_users").insert({
    name,
    email,
    password_hash,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });

  console.log("HR user seeded successfully!");
}