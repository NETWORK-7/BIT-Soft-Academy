import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvConfig } from "@next/env";
import { MongoClient, ServerApiVersion } from "mongodb";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
loadEnvConfig(projectRoot);

const globalForMongo = globalThis;

export function getMongoUri() {
  const explicit = process.env.MONGODB_URI?.trim();
  console.log("🔗 Raw MONGODB_URI from env:", explicit);
  if (explicit && explicit.startsWith("mongodb")) return explicit;
  const fallback = process.env.DATABASE_URL?.trim();
  if (fallback && fallback.startsWith("mongodb")) return fallback;
  return "";
}

/** @deprecated Use getMongoUri — kept for health checks */
export function getDatabaseUrl() {
  return getMongoUri();
}

async function getMongoClient() {
  const uri = getMongoUri();
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    console.log("🔗 Creating MongoDB client with URI:", uri.replace(/:([^:]+)@/, ':***@'));
    const client = new MongoClient(uri);
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb() {
  const client = await getMongoClient();
  if (!client) return null;
  const db = client.db("UserDataDB");
  await ensureIndexes(db);
  return db;
}

async function ensureIndexes(db) {
  if (globalForMongo._mongoIndexesDone) return;
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("lessons").createIndex({ courseId: 1 });
  await db.collection("lessons").createIndex({ sortOrder: 1 });
  await db.collection("courses").createIndex({ tags: 1 });
  globalForMongo._mongoIndexesDone = true;
}

export async function requireDb() {
  const db = await getDb();
  if (!db) {
    throw new Error(
      "MongoDB URI is not set. Add MONGODB_URI=mongodb://127.0.0.1:27017/codemaster (or DATABASE_URL with a mongodb:// URL) to `.env.local`, then restart `npm run dev`."
    );
  }
  return db;
}
