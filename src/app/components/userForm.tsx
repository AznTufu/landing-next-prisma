'use client';

import { useState, useActionState, useEffect } from 'react';
import { createUser } from '@/app/actions/userActions';

const initialState = {
  name: '',
  email: '',
  message: '',
};

export default function UserForm() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  const [name, setName] = useState(initialState.name);
  const [email, setEmail] = useState(initialState.email);
  const [message, setMessage] = useState(initialState.message);

  useEffect(() => {
    if (state?.message === 'Utilisateur créé avec succès !') {
      setName('');
      setEmail('');
      setMessage('');
    }
  }, [state]);

  return (
    <>
      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className={`px-4 py-2 rounded-md text-white ${
            pending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {pending ? 'En cours...' : 'Créer'}
        </button>
        <p aria-live="polite">{state?.message}</p>
      </form>
    </>
  );
}