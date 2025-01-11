'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function ProfileMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-full border hover:shadow-md transition-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="bg-white rounded-lg shadow-lg mt-2 p-1 min-w-[200px] border"
          align="end"
          sideOffset={5}
        >
          <div className="py-2">
            <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
              Sign up
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
              Log in
            </DropdownMenu.Item>
          </div>

          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

          <div className="py-2">
            <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
              Gift cards
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
              Airbnb your home
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
              Host an experience
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
              Help Center
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
} 