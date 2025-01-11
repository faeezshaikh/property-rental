'use client';

import Image from 'next/image';
import { RentalProperty } from '../types/property';
import Link from 'next/link';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { toast } from 'sonner';
import ImageCarousel from './ImageCarousel';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { useToast } from "@/components/ui/use-toast";


interface PropertyCardProps {
  property: RentalProperty;
  onDelete: (id: string) => void;
}

export default function PropertyCard({ property, onDelete }: PropertyCardProps) {
  const handleDelete = () => {
    onDelete(property.id);
    toast.success("Property deleted", {
      description: "The property has been successfully deleted."
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <ImageCarousel 
        images={[property.imageUrl, ...(property.images || [])]} 
        alt={property.title}
      />
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{property.title}</h2>
        <p className="text-gray-600 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {property.address}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-[#FF385C]">${property.price}/month</span>
          <div className="flex items-center text-gray-500 text-sm">
            <span className="flex items-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {property.bedrooms} beds
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              {property.bathrooms} baths
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <Link 
            href={`/properties/${property.id}`}
            className="text-[#FF385C] hover:text-[#E31C5F] font-semibold flex items-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => {/* Add edit handler */}}
              className="text-gray-600 hover:text-blue-600"
            >
              Edit
            </button>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className="text-gray-600 hover:text-red-600">
                  Delete
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md z-50">
                  <AlertDialog.Title className="text-lg font-semibold mb-2">
                    Are you sure?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="text-gray-600 dark:text-gray-300 mb-6">
                    This action cannot be undone. This will permanently delete the property
                    and remove it from our servers.
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4">
                    <AlertDialog.Cancel asChild>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                        Cancel
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button 
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      </div>
    </div>
  );
} 