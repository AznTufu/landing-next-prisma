import * as bcrypt from 'bcryptjs';
import * as jose from 'jose';

if (!process.env.JWT_SECRET) {
  throw new Error('La variable JWT_SECRET doit être définie dans .env.local');
}

const SECRET_KEY = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function verifyToken(token: string) {
  try {
    const secretKey = new TextEncoder().encode(SECRET_KEY);
    const { payload } = await jose.jwtVerify(token, secretKey);

    return payload;
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    return null;
  }
}

export async function generateToken(userId: string) {
  try {
    const secretKey = new TextEncoder().encode(SECRET_KEY);
    const token = await new jose.SignJWT({ userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secretKey);

    return token;
  } catch (error) {
    console.error("Erreur de génération du token:", error);
    throw error;
  }
}