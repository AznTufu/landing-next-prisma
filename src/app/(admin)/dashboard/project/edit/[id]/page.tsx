'use client';

import { getProject, updateProject } from '@/app/actions/projectActions';
import { getAllTags } from '@/app/actions/tagActions';
import { Tag } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const resolvedParams = use(params);

  useEffect(() => {
    const fetchData = async () => {
      const project = await getProject(resolvedParams.id);
      const tags = await getAllTags();
      if (project) {
        setTitle(project.title);
        setDescription(project.description || '');
        setSelectedTagIds(project.tags.map((tag) => tag.id));
      }
      setTags(tags);
    };
    fetchData();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProject(resolvedParams.id, title, description, selectedTagIds);
    router.push('/dashboard');
  };

  const handleTagChange = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Modifier le projet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium" htmlFor="title">
            Titre :
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium" htmlFor="description">
            Description :
          </label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Tags :</label>
          <div className="space-y-2">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  value={tag.id}
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                  className="mr-2"
                />
                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}