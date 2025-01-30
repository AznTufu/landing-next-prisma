"use client";

import React, { useState } from "react";
import { Project as PrismaProject } from "@prisma/client";
import { Button } from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";

interface Project extends PrismaProject {
  images: { filePath: string }[];
}

function ProjectsClient({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(2);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, projects.length));
  };

  return (
    <div className="projectsContainer">
      <div className="projectsGrid">
        {projects.slice(0, visibleCount).map((project) => (
          <ProjectCard
            key={project.id}
            name={project.title}
            imageUrl={project.images[0].filePath}
            projectId={project.id}
          />
        ))}
      </div>
      {visibleCount < projects.length && (
        <Button
          onClick={handleShowMore}
          sx={{
            width: "fit-content",
            backgroundColor: "transparent",
            color: "white",
            fontSize: "14px",
            fontWeight: "600 !important",
            borderRadius: "100px",
            padding: "8px 16px",
            border: "2px solid #FC6D36",
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            marginTop: "32px",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#FC6D36",
              transform: "translateX(-100%)",
              transition: "transform 0.5s ease",
              zIndex: -1,
            },
            "&:hover": {
              color: "white",
              border: "2px solid #FC6D36",
            },
            "&:hover::after": {
              transform: "translateX(0)",
            },
          }}
        >
          Show More
        </Button>
      )}
    </div>
  );
}

export default ProjectsClient;
