import { RentalProperty } from '../types/property';

export const initialProperties: RentalProperty[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Main St, City, State",
    price: 2000,
    bedrooms: 2,
    bathrooms: 2,
    description: "Beautiful modern apartment in the heart of downtown",
    imageUrl: "https://media.istockphoto.com/id/1396856251/photo/colonial-house.jpg?s=1024x1024&w=is&k=20&c=79iVVKP-EVTUFVlAkUogY0AVIgjs93IEEqZjFWXI0sE=",
    "images": [
        "https://media.istockphoto.com/id/91440596/photo/dreams-house.jpg?s=1024x1024&w=is&k=20&c=Tv7LjdndEQOQF-23DX9lEYmDEZcgVFmPVdjeHw77vVw=",
        "https://media.istockphoto.com/id/176744139/photo/trees-behind-a-large-beige-stone-house-with-two-garages.jpg?s=1024x1024&w=is&k=20&c=QeWBiALRxHcrNbYdclaIvn3NjV6nUq3ZxjY8PerznQQ="
      ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]; 