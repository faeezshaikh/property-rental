'use client';

import { useProperties } from '../context/PropertiesContext';
import AddPropertyButton from './AddPropertyButton';
import ProfileMenu from './ProfileMenu';

export default function Header() {
  const { addProperty } = useProperties();

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Rental Properties</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search properties..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
          <AddPropertyButton onAdd={addProperty} />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
} 