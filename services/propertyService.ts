import type { Property, FilterOptions } from '../types';

// Mock properties data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Beautiful Beachfront Villa',
    location: 'Malibu, California',
    distance: 25,
    availableDates: 'Dec 15-20',
    price: 250,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'],
    category: 'beachfront'
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, Colorado',
    distance: 150,
    availableDates: 'Jan 5-10',
    price: 180,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400'],
    category: 'treehouses'
  },
  {
    id: '3',
    title: 'Luxury Downtown Penthouse',
    location: 'New York City, NY',
    distance: 5,
    availableDates: 'Nov 20-25',
    price: 450,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'],
    category: 'luxe'
  },
  {
    id: '4',
    title: 'Rustic Farmhouse',
    location: 'Napa Valley, California',
    distance: 80,
    availableDates: 'Dec 1-5',
    price: 120,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400'],
    category: 'farms'
  },
  {
    id: '5',
    title: 'Modern Tiny Home',
    location: 'Portland, Oregon',
    distance: 200,
    availableDates: 'Jan 15-20',
    price: 85,
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'],
    category: 'tiny_homes'
  },
  {
    id: '6',
    title: 'Island Paradise Resort',
    location: 'Maui, Hawaii',
    distance: 500,
    availableDates: 'Feb 1-7',
    price: 350,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'],
    category: 'islands'
  }
];

export const fetchProperties = async (filters: FilterOptions): Promise<Property[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProperties = [...mockProperties];

  // Apply filters
  if (filters.category) {
    filteredProperties = filteredProperties.filter(property =>
      property.category === filters.category
    );
  }

  if (filters.location) {
    filteredProperties = filteredProperties.filter(property =>
      property.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters.guests) {
    const totalGuests = filters.guests.adults + filters.guests.children;
    // For demo, just return all properties regardless of guest count
    // In real app, you'd filter by capacity
  }

  return filteredProperties;
};

// ... (the rest of the file remains the same)

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const property = mockProperties.find(p => p.id === id);
  return property || null;
};

export const createProperty = async (property: Omit<Property, 'id'>): Promise<Property> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newProperty: Property = {
    ...property,
    id: Date.now().toString()
  };

  mockProperties.push(newProperty);
  return newProperty;
};

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<Property> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockProperties.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Property not found');
  }

  mockProperties[index] = { ...mockProperties[index], ...updates };
  return mockProperties[index];
};

export const deleteProperty = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockProperties.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProperties.splice(index, 1);
  }
};