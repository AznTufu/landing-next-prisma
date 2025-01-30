import { getProject } from '@/app/actions/projectActions';
import { notFound } from 'next/navigation';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
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
        {new Date(project.createdAt).toLocaleString('fr-FR')}
      </div>
      <div className="mb-2">
        <strong>Mis à jour le : </strong>
        {new Date(project.updatedAt).toLocaleString('fr-FR')}
      </div>
    </div>
  );
}