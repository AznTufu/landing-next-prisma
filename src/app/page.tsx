import UserForm from '@/app/components/userForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm />
    </div>
  );
}