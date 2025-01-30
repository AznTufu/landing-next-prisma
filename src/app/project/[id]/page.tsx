import { getProject } from "@/app/actions/projectActions";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.id);
  console.log(project);

  if (!project) {
    notFound();
  }

  const transformedProject = {
    ...project,
    tags: project.tags.map((tag) => tag.name),
  };

  return <ProjectClient project={transformedProject} />;
}
