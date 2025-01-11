'use client';

import { useState, useCallback, useEffect } from 'react';
import { RentalProperty } from "./types/property";
import PropertyCard from "./components/PropertyCard";
import { useProperties } from './context/PropertiesContext';
import PriceRangeSlider from './components/PriceRangeSlider';

export default function Home() {
  const { properties } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate min and max prices from properties
  const minPrice = Math.min(...properties.map(p => p.price));
  const maxPrice = Math.max(...properties.map(p => p.price));
  
  // Initialize price range with null to indicate it hasn't been set yet
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  // Update price range when properties change or on initial load
  useEffect(() => {
    if (properties.length > 0) {
      const min = Math.min(...properties.map(p => p.price));
      const max = Math.max(...properties.map(p => p.price));
      setPriceRange([min, max]);
    }
  }, [properties]);

  const handlePriceChange = useCallback((min: number, max: number) => {
    setPriceRange([min, max]);
  }, []);

  // Only filter properties if priceRange has been initialized
  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!priceRange || (
      property.price >= priceRange[0] &&
      property.price <= priceRange[1]
    ))
  );

  // Don't render the slider until we have the price range
  if (!priceRange) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mt-6 max-w-xl">
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
          initialRange={priceRange}
        />
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProperties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property}
            onDelete={() => {}} // Added required onDelete prop
          />
        ))}
      </main>
    </div>
  );
}
