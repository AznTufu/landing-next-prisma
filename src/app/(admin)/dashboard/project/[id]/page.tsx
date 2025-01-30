import { getProject } from "@/app/actions/projectActions";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.id);
  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Détails du projet</h1>
      <div className="mb-2">
        <strong>Titre : </strong>
        {project.title}
      </div>
      <div className="mb-2">
        <strong>Description : </strong>
        {project.description}
      </div>
      <div className="mb-2">
        <strong>Créé le : </strong>
        {new Date(project.createdAt).toLocaleString("fr-FR")}
      </div>
      <div className="mb-2">
        <strong>Mis à jour le : </strong>
        {new Date(project.updatedAt).toLocaleString("fr-FR")}
      </div>
      <div className="mb-2">
        <strong>Tags :</strong>
        {project.tags && project.tags.length > 0 ? (
          <ul>
            {project.tags.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        ) : (
          <p>Aucun tag</p>
        )}
      </div>
      <div className="mb-2">
        <strong>Images :</strong>
        {project.images && project.images.length > 0 ? (
          <div>
            {project.images.map((img) => (
              <Image
                key={img.id}
                src={img.filePath}
                alt={img.filename}
                className="mt-2 max-w-full rounded-lg w-auto h-auto"
                width={250}
                height={250}
                priority
              />
            ))}
          </div>
        ) : (
          <p>Aucune image</p>
        )}
      </div>
    </div>
  );
}
