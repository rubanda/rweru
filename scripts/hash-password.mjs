#!/usr/bin/env node
import { hash } from "bcryptjs";

const password = process.argv.slice(2).join(" ");

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  console.error(
    "Generate a bcrypt hash for DASHBOARD_PASSWORD_HASH. Do not commit the password.",
  );
  process.exit(1);
}

if (password.length < 12) {
  console.error("Use a password of at least 12 characters.");
  process.exit(1);
}

const hashed = await hash(password, 12);
console.log("");
console.log("Add this value as DASHBOARD_PASSWORD_HASH on Vercel:");
console.log("");
console.log(hashed);
console.log("");
