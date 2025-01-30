"use client";

import { getImage, updateImage } from "@/app/actions/imageActions";
import { getAllProjects } from "@/app/actions/projectActions";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect, use } from "react";

export default function EditImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [filename, setFilename] = useState("");
  const [projectId, setProjectId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const resolvedParams = use(params);

  useEffect(() => {
    const fetchData = async () => {
      const image = await getImage(resolvedParams.id);
      const projects = await getAllProjects();
      if (image) {
        setFilename(image.filename);
        setProjectId(image.projectId);
      }
      setProjects(projects);
    };
    fetchData();
  }, [resolvedParams.id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !projectId) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      await updateImage(params.id, filename, buffer);
      router.push("/dashboard");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Modifier l&apos;image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium" htmlFor="file">
            Fichier image :
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
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
          disabled={!file || !projectId || projects.length === 0}
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
