'use client';

import { useState } from 'react';
import PropertyModal from './PropertyModal';
import { RentalProperty } from '../types/property';
import { toast } from 'sonner';

interface AddPropertyButtonProps {
  onAdd: (property: RentalProperty) => void;
}

export default function AddPropertyButton({ onAdd }: AddPropertyButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (propertyData: Omit<RentalProperty, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProperty: RentalProperty = {
      ...propertyData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Adding new property:', newProperty);
    
    onAdd(newProperty);
    toast.success('Property added successfully');
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#FF385C] text-white px-4 py-2 rounded-lg hover:bg-[#E31C5F] transition-colors"
      >
        Add New Property
      </button>
      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />
    </>
  );
} 