"use client";

import { createImage } from "@/app/actions/imageActions";
import { getAllProjects } from "@/app/actions/projectActions";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";

export default function CreateImagePage() {
  const router = useRouter();
  const [filename, setFilename] = useState("");
  const [projectId, setProjectId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllProjects();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

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
      const dataBase64 = reader.result as string;
      await createImage(filename, dataBase64, projectId);
      router.push("/dashboard");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Créer une image</h1>
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
            required
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
          Enregistrer
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
