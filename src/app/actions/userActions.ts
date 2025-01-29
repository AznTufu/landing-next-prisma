"use server";
import prisma from "@/frameworks/db";
import { User } from "@prisma/client";

export async function createUser(
  prevState: Record<string, unknown>,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!email || !name || !message) {
    return { message: "Tous les champs sont obligatoires." };
  }

  if (name.length < 2) {
    return { message: "Le nom doit comporter au moins 2 caractères." };
  }

  if (email.length < 4) {
    return { message: "L'email doit comporter au moins 4 caractères." };
  }

  if (message.length < 4) {
    return { message: "Le message doit comporter au moins 4 caractères." };
  }

  try {
    await prisma.user.create({
      data: { email, name, message },
    });
    return { message: "Utilisateur créé avec succès !" };
  } catch (error) {
    return {
      message: `Erreur lors de la création de l’utilisateur : ${
        (error as Error).message || error
      }`,
    };
  }
}

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUser(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function deleteUser(userId: string) {
  return await prisma.user.delete({
    where: { id: userId },
  });
}
