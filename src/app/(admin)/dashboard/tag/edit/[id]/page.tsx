'use client';

import { getTag, updateTag } from '@/app/actions/tagActions';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';

export default function EditTagPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchTag = async () => {
      const tag = await getTag(resolvedParams.id);
      if (tag) {
        setName(tag.name);
      }
    };
    fetchTag();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTag(resolvedParams.id, name);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Modifier le tag</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom du tag :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}