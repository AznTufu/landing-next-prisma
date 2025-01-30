"use client";

import React, { useState } from "react";
import { Project as PrismaProject, Tag } from "@prisma/client";
import {
  Button,
  FormControl,
  Chip,
  Autocomplete,
  TextField,
} from "@mui/material";
import ProjectCard from "../ProjectCard/ProjectCard";

interface Project extends PrismaProject {
  images: { filePath: string }[];
  tags: Tag[];
}

interface ProjectsClientProps {
  projects: Project[];
  tags: Tag[];
}

function ProjectsClient({ projects, tags }: ProjectsClientProps) {
  const [visibleCount, setVisibleCount] = useState(2);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, filteredProjects.length));
  };

  const handleTagChange = (_event: React.SyntheticEvent, newValue: Tag[]) => {
    setSelectedTags(newValue);
    setVisibleCount(2);
  };

  const filteredProjects =
    selectedTags.length === 0
      ? projects
      : projects.filter((project) =>
          project.tags.some((tag) => selectedTags.find((t) => t.id === tag.id))
        );

  return (
    <div className="projectsContainer">
      <FormControl sx={{ minWidth: 200, marginBottom: 4 }}>
        <Autocomplete
          multiple
          options={tags}
          getOptionLabel={(option) => option.name}
          value={selectedTags}
          onChange={handleTagChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by Tags"
              sx={{
                color: "white",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FC6D36",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FC6D36",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                  "&.Mui-focused": {
                    color: "#FC6D36",
                  },
                },
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.name}
                sx={{
                  color: "white",
                  backgroundColor: "#FC6D36",
                  "& .MuiChip-deleteIcon": {
                    color: "white",
                    "&:hover": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
              />
            ))
          }
          sx={{
            minWidth: "300px",
            "& .MuiAutocomplete-clearIndicator, & .MuiAutocomplete-popupIndicator":
              {
                color: "white",
              },
          }}
        />
      </FormControl>
      <div className="projectsGrid">
        {filteredProjects.slice(0, visibleCount).map((project) => (
          <ProjectCard
            key={project.id}
            name={project.title}
            imageUrl={project.images[0]?.filePath || undefined}
            projectId={project.id}
            tags={project.tags}
          />
        ))}
      </div>
      {visibleCount < filteredProjects.length && (
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
