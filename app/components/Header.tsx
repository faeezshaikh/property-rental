'use client';

import { useProperties } from '../context/PropertiesContext';
import AddPropertyButton from './AddPropertyButton';
import ProfileMenu from './ProfileMenu';
import Logo from './Logo';

export default function Header() {
  const { addProperty } = useProperties();

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF385C] dark:bg-gray-800 dark:border-gray-700 w-64 transition-all focus:w-80"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 absolute left-3 top-2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <AddPropertyButton onAdd={addProperty} />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
} 