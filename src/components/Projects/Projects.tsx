import React from "react";
import { Project as PrismaProject, Tag } from "@prisma/client";
import { getAllProjects } from "@/app/actions/projectActions";
import ProjectsClient from "./ProjectsClient";
import "./Projects.css";
import { getAllTags } from "@/app/actions/tagActions";

interface Project extends PrismaProject {
  images: { filePath: string }[];
  tags: Tag[];
}

async function Projects() {
  const projects: Project[] = await getAllProjects();
  const tags: Tag[] = await getAllTags();
  return <ProjectsClient projects={projects} tags={tags} />;
}

export default Projects;
