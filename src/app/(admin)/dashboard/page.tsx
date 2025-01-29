import { getAllUsers, deleteUser } from '@/app/actions/userActions';
import { User } from '@prisma/client';
import { FaTrash } from 'react-icons/fa';
import { revalidatePath } from 'next/cache';

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

export default async function UsersPage() {
  const users: User[] = await getAllUsers();

  const handleDelete = async (userId: string) => {
    'use server';
    await deleteUser(userId);
    revalidatePath('/dashboard');
  };

  return (
    <div>
      <h1>Users List</h1>
      {users && users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <a href={`/dashboard/user/${user.id}`}>
                <div>
                  <strong>{user.name}</strong> - {user.email}
                </div>
                <div>{user.message}</div>
                <div>{formatDate(user.createdAt)}</div>
              </a>
              <form action={handleDelete.bind(null, user.id)}>
                <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <FaTrash style={{ color: 'red' }} />
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}