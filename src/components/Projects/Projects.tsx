import React from "react";
import { Project as PrismaProject } from "@prisma/client";
import { getAllProjects } from "@/app/actions/projectActions";
import ProjectsClient from "./ProjectsClient";
import "./Projects.css";

interface Project extends PrismaProject {
  images: { filePath: string }[];
}

async function Projects() {
  const projects: Project[] = await getAllProjects();
  return <ProjectsClient projects={projects} />;
}

export default Projects;
