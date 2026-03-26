import { SignJWT, jwtVerify } from "jose";
import { getUserById } from "@/lib/firebase-db";

function getSecretKey() {
  const s = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    throw new Error("NEXTAUTH_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(s);
}

export const SESSION_COOKIE = "session";

export async function signUserToken(user) {
  return new SignJWT({
    email: user.email,
    name: user.name,
  })
    .setSubject(user.id)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyUserToken(token) {
  const { payload } = await jwtVerify(token, getSecretKey());
  
  // Get full user data from Firebase
  const fullUser = await getUserById(payload.sub);
  
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    ...fullUser // Include all user data from Firebase
  };
}

/** For Edge middleware: verify without throwing helper pattern */
export async function verifyUserTokenSafe(token) {
  try {
    const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
    if (!secret || secret.length < 32) return null;
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}
