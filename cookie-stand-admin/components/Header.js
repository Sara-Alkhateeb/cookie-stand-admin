// components/Header.js
import React from 'react';

export default function Header({ user, onLogout }) {
  return (
    <header className="flex items-center justify-between p-10 bg-green-700 text-green-100">
      <h1 className="text-6xl">Cookie Stand Admin</h1>
      {user && (
        <div className="flex items-center">
          <h2 className="mr-4">Welcome {user.username}</h2>
          <button
            className="px-12 py-5 bg-green-700 text-green-100 hover:bg-green-500 hover:text-white transition-colors"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
