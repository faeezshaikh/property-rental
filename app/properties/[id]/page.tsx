'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { RentalProperty } from '@/app/types/property';
import { useProperties } from '@/app/context/PropertiesContext';

export default function PropertyDetails() {
  const { properties } = useProperties();
  const { id } = useParams();
  const property = properties.find((p: RentalProperty) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 block">
          ← Back to properties
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-96">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>Price: <span className="font-semibold">${property.price}/month</span></p>
                  <p>Bedrooms: <span className="font-semibold">{property.bedrooms}</span></p>
                  <p>Bathrooms: <span className="font-semibold">{property.bathrooms}</span></p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <p className="text-gray-600 dark:text-gray-300">{property.address}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-300">{property.description}</p>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Listed on: {property.createdAt.toLocaleDateString()}</p>
              <p>Last updated: {property.updatedAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 