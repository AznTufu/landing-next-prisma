import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import "./ProjectCard.css";

interface ProjectCardProps {
  name: string;
  imageUrl: string;
  projectId: string;
}

function ProjectCard({ name, imageUrl, projectId }: ProjectCardProps) {
  return (
    <div className="projectCard">
      <div className="imageContainer">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={300}
          objectFit="cover"
        />
      </div>
      <div className="projectContent">
        <h4>{name}</h4>
        <Button
          onClick={() => {
            window.location.href = "/project/" + projectId;
          }}
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
            fontFamily: "Inter, sans-serif",
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
          variant="outlined"
        >
          View Project
        </Button>
      </div>
    </div>
  );
}

export default ProjectCard;
