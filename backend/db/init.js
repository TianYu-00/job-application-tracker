import "dotenv/config";
import postgres from "postgres";
import fs from "fs";
import path from "path";

const sql = postgres(process.env.DATABASE_URL);

const initSQL = fs.readFileSync(path.resolve("./db/init.sql"), "utf8");
await sql.unsafe(initSQL);
await sql.end();

console.log("Database initialized");
