'use server';
import prisma from '@/frameworks/db';
import { Tag } from '@prisma/client';

export async function createTag(name: string) {
  return await prisma.tag.create({
    data: { name },
  });
}

export async function getAllTags(): Promise<Tag[]> {
  return await prisma.tag.findMany();
}

export async function getTag(tagId: string): Promise<Tag | null> {
  return await prisma.tag.findUnique({
    where: { id: tagId },
  });
}

export async function updateTag(tagId: string, name: string) {
  return await prisma.tag.update({
    where: { id: tagId },
    data: { name },
  });
}

export async function deleteTag(tagId: string) {
  return await prisma.tag.delete({
    where: { id: tagId },
  });
}