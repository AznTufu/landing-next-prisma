"use client";

import { getImage, updateImage } from '@/app/actions/imageActions';
import { getAllProjects } from '@/app/actions/projectActions';
import { Project, Image } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { default as NextImage } from 'next/image';

export default function EditImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [image, setImage] = useState<Image | null>(null);
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchData = async () => {
      const imageData = await getImage(resolvedParams.id);
      const projectsData = await getAllProjects();
      if (imageData) {
        setImage(imageData);
        setProjectId(imageData.projectId || '');
      }
      setProjects(projectsData);
    };
    fetchData();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !projectId) return;

    await updateImage(resolvedParams.id, image.filename, image.filePath);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Modifier l&apos;image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {image && (
          <div>
            <NextImage
              src={image.filePath}
              alt={image.filename}
              className="mt-2 max-w-full rounded-lg w-auto h-auto"
              width={500}
              height={500}
              priority
            />
          </div>
        )}
        <div>
          <label className="block font-medium" htmlFor="projectId">
            Projet associé :
          </label>
          <select
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Sélectionnez un projet
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={!projectId || projects.length === 0}
        >
          Mettre à jour
        </button>
        {projects.length === 0 && (
          <p className="text-red-500">
            Aucun projet disponible. Créez d&apos;abord un projet.
          </p>
        )}
      </form>
    </div>
  );
}