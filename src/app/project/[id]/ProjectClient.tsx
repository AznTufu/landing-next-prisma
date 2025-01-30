"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import "./style.css";
import { Project as PrismaProject } from "@prisma/client";

interface Project extends PrismaProject {
  tags: string[];
  images: { filePath: string }[];
}

export default function ProjectClient({ project }: { project: Project }) {
  const router = useRouter();
  const formattedDate = format(new Date(project.createdAt), "MMMM dd, yyyy");

  return (
    <div className="projectPage">
      <div className="backButton">
        <Button
          onClick={() => router.back()}
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
          Back
        </Button>
      </div>
      <div className="projectData">
        <div className="projectImageContainer">
          <Image
            src={project.images[0].filePath}
            alt={`${project.title} image`}
            width={800}
            height={500}
            objectFit="cover"
          />
        </div>
        <div className="projectInfo">
          <div>
            <h1 className="projectTitle">{project.title}</h1>
            <p>{project.description}</p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <p className="projectTags">{project.tags.join(", ")}</p>
          )}
          <p className="projectDate">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
