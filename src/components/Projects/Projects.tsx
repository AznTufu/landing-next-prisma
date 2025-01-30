import React from "react";
import { Project } from "@prisma/client";
import { getAllProjects } from "@/app/actions/projectActions";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./Projects.css";

async function Projects() {
  const projects: Project[] = await getAllProjects();

  console.log(projects);

  return (
    <div className="projectsContainer">
      <div className="projectsGrid">
        {projects.map((project) => (
          <ProjectCard key={project.id} name={project.title} imageUrl={""} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
