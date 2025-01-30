'use server';
import prisma from '@/frameworks/db';
import { Project, Prisma } from '@prisma/client';

type ProjectWithTags = Prisma.ProjectGetPayload<{
  include: { tags: true };
}>;

export async function createProject(title: string, description: string, tagIds: string[]) {
  return await prisma.project.create({
    data: {
      title,
      description,
      tags: { connect: tagIds.map((id) => ({ id })) },
    },
  });
}

export async function getAllProjects(): Promise<Project[]> {
  return await prisma.project.findMany({
    include: { tags: true, images: true },
  });
}

export async function getProject(projectId: string): Promise<ProjectWithTags | null> {
  return await prisma.project.findUnique({
    where: { id: projectId },
    include: { tags: true, images: true },
  });
}

export async function updateProject(projectId: string, title: string, description: string, tagIds: string[]) {
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