'use client';

import { createProject } from '@/app/actions/projectActions';
import { getAllTags } from '@/app/actions/tagActions';
import { Tag } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CreateProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getAllTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject(title, description, selectedTagIds);
    router.push('/dashboard');
  };

  const handleTagChange = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Créer un nouveau projet</h1>
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
          Enregistrer
        </button>
      </form>
    </div>
  );
}