"use server";
import prisma from "@/frameworks/db";
import { Project, Image, Tag } from "@prisma/client";

export type ProjectWithRelations = Project & {
  images: Image[];
  tags: Tag[];
};

export async function createProject(
  title: string,
  description: string,
  tagIds: string[]
) {
  return await prisma.project.create({
    data: {
      title,
      description,
      tags: { connect: tagIds.map((id) => ({ id })) },
    },
  });
}

export async function getAllProjects(): Promise<ProjectWithRelations[]> {
  return await prisma.project.findMany({
    include: { tags: true, images: true },
  });
}

export async function getProject(
  projectId: string
): Promise<ProjectWithRelations | null> {
  return prisma.project.findUnique({
    where: { id: projectId },
    include: {
      tags: true,
      images: true,
    },
  });
}

export async function updateProject(
  projectId: string,
  title: string,
  description: string,
  tagIds: string[]
) {
  return await prisma.project.update({
    where: { id: projectId },
    data: {
      title,
      description,
      tags: { set: tagIds.map((id) => ({ id })) },
    },
  });
}

export async function deleteProject(projectId: string) {
  return await prisma.project.delete({
    where: { id: projectId },
  });
}
