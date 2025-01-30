import { getAllUsers, deleteUser } from '@/app/actions/userActions';
import { getAllTags, deleteTag } from '@/app/actions/tagActions';
import { getAllImages, deleteImage } from '@/app/actions/imageActions';
import { getAllProjects, deleteProject } from '@/app/actions/projectActions';
import { Project, Image, Tag, User  } from '@prisma/client';
import { FaTrash } from 'react-icons/fa';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

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
  const tags: Tag[] = await getAllTags();
  const images: Image[] = await getAllImages();
  const projects: Project[] = await getAllProjects();

  const handleDelete = async (type: 'project' | 'image' |'tag' | 'user', id: string) => {
    'use server';
    switch (type) {
      case 'project':
        await deleteProject(id);
        break;
      case 'image':
        await deleteImage(id);
        break;
      case 'tag':
        await deleteTag(id);
        break;
      case 'user':
        await deleteUser(id);
        break;
    }
    revalidatePath('/dashboard');
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Users List</h1>
        {users && users.length > 0 ? (
          <ul className="space-y-2">
            {users.map((user, index) => (
              <li key={index} className="border p-2 rounded">
                <Link href={`/dashboard/user/${user.id}`}>
                  <div>
                    <strong>{user.name}</strong> - {user.email}
                  </div>
                  <div>{user.message}</div>
                  <div>{formatDate(user.createdAt)}</div>
                </Link>
                <form action={handleDelete.bind(null, 'user', user.id)}>
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
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Liste des tags</h1>
        <Link href="/dashboard/tag/create">Créer un nouveau tag</Link>
        {tags && tags.length > 0 ? (
          <ul className="space-y-2">
            {tags.map((tag) => (
              <li key={tag.id} className="border p-2 rounded">
                <Link href={`/dashboard/tag/${tag.id}`}>
                  <div>
                    <strong>{tag.name}</strong>
                  </div>
                </Link>
                <Link href={`/dashboard/tag/edit/${tag.id}`}>Modifier</Link>
                <form action={handleDelete.bind(null, 'tag', tag.id)}>
                  <button type="submit">Supprimer</button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun tag trouvé</p>
        )}
      </div>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Liste des images</h1>
        <Link href="/dashboard/image/create" className="text-blue-500 underline mb-2 inline-block">
          Créer une nouvelle image
        </Link>
        <ul className="space-y-2">
          {images.map((img) => (
            <li key={img.id} className="border p-2 rounded">
              <Link href={`/dashboard/image/${img.id}`} className="text-blue-600 underline">
                {img.filename}
              </Link>
              <Link href={`/dashboard/image/edit/${img.id}`}>Modifier</Link>
              <form action={handleDelete.bind(null, 'image', img.id)}>
                <button type="submit">Supprimer</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Liste des projets</h1>
        <Link href="/dashboard/project/create" className="text-blue-500 underline mb-2 inline-block">
          Créer un nouveau projet
        </Link>
        <ul className="space-y-2">
          {projects.map((proj) => (
            <li key={proj.id} className="border p-2 rounded">
              <Link href={`/dashboard/project/${proj.id}`} className="text-blue-600 underline">
                {proj.title}
              </Link>
              <Link href={`/dashboard/project/edit/${proj.id}`}>Modifier</Link>
              <form action={handleDelete.bind(null, 'project', proj.id)}>
                <button type="submit">Supprimer</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}