'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewUserModal({ isOpen, onClose }: NewUserModalProps) {
  const [kickUsername, setKickUsername] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kickUsername || !streamKey) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/update-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kickUsername,
          streamKey,
        }),
      });
      
      if (response.ok) {
        onClose();
      } else {
        console.error('Failed to save user info');
      }
    } catch (error) {
      console.error('Error saving user info:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl text-orange-500 font-bold mb-4">Complete Your Profile</h2>
        <p className="mb-4 text-orange-500">Please enter your Kick username and stream key to continue.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="kickUsername" className="block text-sm font-medium text-gray-700 mb-1">
              Kick Username
            </label>
            <input
              type="text"
              id="kickUsername"
              value={kickUsername}
              onChange={(e) => setKickUsername(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="streamKey" className="block text-sm font-medium text-gray-700 mb-1">
              Stream Key
            </label>
            <input
              type="password"
              id="streamKey"
              value={streamKey}
              onChange={(e) => setStreamKey(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Your stream key is kept secure and encrypted.
            </p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-300"
            >
              {isSubmitting ? 'Saving...' : 'Save and Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}