import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env.local") });
dotenv.config({ path: join(__dirname, "..", ".env") });

const uri =
  process.env.MONGODB_URI?.trim() ||
  (process.env.DATABASE_URL?.startsWith("mongodb") ? process.env.DATABASE_URL.trim() : "");
if (!uri) {
  console.error("Set MONGODB_URI or DATABASE_URL (mongodb://...) in .env.local");
  process.exit(1);
}

const dbName = process.env.MONGODB_DB || "codemaster";
const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);

const jsonPath = join(__dirname, "..", "src", "data", "courses.json");
const { courses } = JSON.parse(readFileSync(jsonPath, "utf8"));

const count = await db.collection("courses").countDocuments();
if (count > 0) {
  console.log("courses collection already has documents; skipping.");
  await client.close();
  process.exit(0);
}

const now = new Date();
for (const c of courses) {
  await db.collection("courses").insertOne({
    title: c.title,
    description: c.description || "",
    image: c.image || "",
    points: c.points || 0,
    tags: Array.isArray(c.tags) ? c.tags : [],
    duration: c.duration || "",
    rating: c.rating ?? null,
    instructor: c.instructor || "",
    createdAt: now,
    updatedAt: now,
  });
  console.log("Inserted:", c.title);
}

await client.close();
console.log("Done.");
