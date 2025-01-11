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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <ImageCarousel 
        images={[property.imageUrl, ...(property.images || [])]} 
        alt={property.title}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{property.address}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">${property.price}/month</span>
          <span className="text-sm text-gray-500">
            {property.bedrooms} beds • {property.bathrooms} baths
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <Link 
            href={`/properties/${property.id}`}
            className="text-blue-600 hover:underline"
          >
            View Details
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