'use server'

import prisma from '@/frameworks/db'
import { comparePassword, generateToken } from '@/lib/auth'
import { cookies } from 'next/headers';

export async function loginAdmin(username: string, password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return { error: 'Nom d\'utilisateur ou mot de passe incorrect' };
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return { error: 'Nom d\'utilisateur ou mot de passe incorrect' };
    }

    const token = await generateToken(admin.id);
    
    return { success: true, token };
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return { error: 'Une erreur est survenue' };
  }
}

export async function logoutAdmin() {
  (await cookies()).delete('adminToken');
}

export async function getAdmin() {
    const admin = await prisma.admin.findFirst({
        select: {
        username: true,
        createdAt: true,
        }
    });
    return admin;
}