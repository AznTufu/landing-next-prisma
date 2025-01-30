'use server';
import prisma from '@/frameworks/db';
import { Image } from '@prisma/client';
import path from 'path';
import fs from 'fs';

export async function createImage(filename: string, dataBase64: string, projectId: string) {
  const buffer = Buffer.from(dataBase64.split(',')[1], 'base64');

  const publicFolder = path.join(process.cwd(), 'public', 'images');
  const filePath = `/images/${filename}`;

  if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder, { recursive: true });
  }

  fs.writeFileSync(path.join(publicFolder, filename), buffer);

  return await prisma.image.create({
    data: {
      filename,
      filePath,
      projectId,
    },
  });
}

export async function getAllImages(): Promise<Image[]> {
  return await prisma.image.findMany();
}

export async function getImage(imageId: string) {
  return await prisma.image.findUnique({
    where: { id: imageId },
  });
}

export async function updateImage(imageId: string, filename: string, filePath: string) {
  return await prisma.image.update({
    where: { id: imageId },
    data: { filename, filePath },
  });
}

export async function deleteImage(imageId: string) {
  const image = await prisma.image.findUnique({
    where: { id: imageId },
  });

  if (image) {
    const filePath = path.join(process.cwd(), 'public', image.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return await prisma.image.delete({
      where: { id: imageId },
    });
  }
}