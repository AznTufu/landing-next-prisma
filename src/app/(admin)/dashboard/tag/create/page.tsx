'use client';

import { createTag } from '@/app/actions/tagActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateTagPage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTag(name);
    router.push('/dashboard');
  };

  return (
    <div>
      <h1>Créer un nouveau tag</h1>
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
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}