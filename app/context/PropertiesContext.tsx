'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { RentalProperty } from '../types/property';
import { initialProperties } from '../data/properties';

type PropertiesContextType = {
  properties: RentalProperty[];
  setProperties: (properties: RentalProperty[]) => void;
  addProperty: (property: RentalProperty) => void;
};

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<RentalProperty[]>(initialProperties);

  // Load properties on mount
  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.error('Invalid data format:', data);
          return;
        }

        // Convert string dates back to Date objects
        const propertiesWithDates = data.map((prop: any) => ({
          ...prop,
          createdAt: new Date(prop.createdAt),
          updatedAt: new Date(prop.updatedAt),
        }));
        setProperties(propertiesWithDates);
      })
      .catch(error => console.error('Error loading properties:', error));
  }, []);

  // Save properties whenever they change
  useEffect(() => {
    // Don't save if it's the initial load
    if (properties === initialProperties) return;

    fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(properties),
    }).catch(error => console.error('Error saving properties:', error));
  }, [properties]);

  const addProperty = useCallback((property: RentalProperty) => {
    console.log('Context adding property:', property);
    setProperties(prev => [...prev, property]);
  }, []);

  return (
    <PropertiesContext.Provider value={{ properties, setProperties, addProperty }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
} 