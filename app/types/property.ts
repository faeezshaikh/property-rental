export interface RentalProperty {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  imageUrl: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
} 