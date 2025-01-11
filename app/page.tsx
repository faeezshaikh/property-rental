'use client';

import { useState, useCallback, useEffect } from 'react';
import { RentalProperty } from "./types/property";
import PropertyCard from "./components/PropertyCard";
import AddPropertyButton from "./components/AddPropertyButton";
import { useProperties } from './context/PropertiesContext';
import PriceRangeSlider from './components/PriceRangeSlider';

export default function Home() {
  const { properties, setProperties, addProperty } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate min and max prices from properties
  const minPrice = Math.min(...properties.map(p => p.price));
  const maxPrice = Math.max(...properties.map(p => p.price));
  
  // Initialize price range with calculated values
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  // Update price range when properties change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [properties.length, minPrice, maxPrice]);

  const handlePriceChange = useCallback((min: number, max: number) => {
    setPriceRange([min, max]);
  }, []);

  const handleAddProperty = (newProperty: RentalProperty) => {
    console.log('Home handling new property:', newProperty);
    addProperty(newProperty);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    property.price >= priceRange[0] &&
    property.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Rental Properties</h1>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <AddPropertyButton onAdd={handleAddProperty} />
          </div>
        </div>
        <div className="mt-6 max-w-xl">
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            onDelete={handleDeleteProperty}
          />
        ))}
      </main>
    </div>
  );
}
