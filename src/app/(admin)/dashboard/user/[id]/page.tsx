import { getUser, deleteUser } from '@/app/actions/userActions';
import { notFound, redirect } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  if (!user) {
    return { title: 'Utilisateur non trouvé' };
  }
  return { title: `Profil de ${user.name}` };
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  if (!user) {
    notFound();
  }

  const handleDelete = async () => {
    'use server';
    await deleteUser(params.id);
    redirect('/dashboard');
  };

  return (
    <div>
      <h1>Profil de {user.name}</h1>
      <div>
        <strong>{user.name}</strong> - {user.email}
      </div>
      <div>{user.message}</div>
      <div>{formatDate(user.createdAt)}</div>
      <form action={handleDelete}>
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <FaTrash style={{ color: 'red' }} />
        </button>
      </form>
    </div>
  );
}