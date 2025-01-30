'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/adminActions';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await logoutAdmin();
      document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/login');
    };

    handleLogout();
  }, [router]);

  return (
    <div className="max-w-md mx-auto p-4">
      <p className="text-xl font-bold mb-4">Déconnexion en cours...</p>
    </div>
  );
}