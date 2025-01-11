'use client';

import * as Slider from '@radix-ui/react-slider';
import { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  initialRange: [number, number];
}

export default function PriceRangeSlider({ minPrice, maxPrice, onPriceChange, initialRange }: PriceRangeSliderProps) {
  const [range, setRange] = useState(initialRange);

  // Only update range when initialRange changes
  useEffect(() => {
    if (range[0] !== initialRange[0] || range[1] !== initialRange[1]) {
      setRange(initialRange);
    }
  }, [initialRange]);

  // Only notify parent when range changes due to user interaction
  const handleRangeChange = (value: number[]) => {
    const newRange = value as [number, number];
    setRange(newRange);
    onPriceChange(newRange[0], newRange[1]);
  };

  return (
    <div className="w-full px-2">
      <h2 className="text-lg font-semibold mb-4">Price Range</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Monthly rent before fees and taxes
      </p>
      <div className="flex justify-between mb-2">
        <span className="text-lg">${range[0]}</span>
        <span className="text-lg">${range[1]}</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={range}
        max={maxPrice}
        min={minPrice}
        step={10}
        onValueChange={handleRangeChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Minimum price"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Maximum price"
        />
      </Slider.Root>
    </div>
  );
} 