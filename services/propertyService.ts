import type { Property, FilterOptions } from '../types';

// Mock properties data
const mockProperties: Property[] = [
  // Amazing Views
  {
    id: '1',
    title: 'Cliffside Ocean Villa',
    location: 'Big Sur, California',
    distance: 120,
    availableDates: 'Dec 15-20',
    price: 350,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'],
    category: 'amazing_views'
  },
  {
    id: '2',
    title: 'Mountain Peak Chalet',
    location: 'Banff, Canada',
    distance: 250,
    availableDates: 'Jan 5-10',
    price: 280,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400'],
    category: 'amazing_views'
  },
  {
    id: '3',
    title: 'Desert Canyon Retreat',
    location: 'Sedona, Arizona',
    distance: 180,
    availableDates: 'Feb 10-15',
    price: 220,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
    category: 'amazing_views'
  },

  // Chef's Kitchens
  {
    id: '4',
    title: 'Gourmet Kitchen Loft',
    location: 'San Francisco, CA',
    distance: 8,
    availableDates: 'Nov 20-25',
    price: 180,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
    category: 'chefs_kitchens'
  },
  {
    id: '5',
    title: 'Professional Chef\'s Studio',
    location: 'New York City, NY',
    distance: 3,
    availableDates: 'Dec 1-5',
    price: 250,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
    category: 'chefs_kitchens'
  },

  // Luxe
  {
    id: '6',
    title: 'Skyline Penthouse',
    location: 'Chicago, IL',
    distance: 12,
    availableDates: 'Jan 15-20',
    price: 550,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'],
    category: 'luxe'
  },
  {
    id: '7',
    title: 'Luxury Beach Estate',
    location: 'Malibu, CA',
    distance: 35,
    availableDates: 'Feb 1-7',
    price: 750,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'],
    category: 'luxe'
  },

  // Surfing
  {
    id: '8',
    title: 'Beachside Surf Shack',
    location: 'Huntington Beach, CA',
    distance: 45,
    availableDates: 'Mar 10-15',
    price: 150,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'],
    category: 'surfing'
  },
  {
    id: '9',
    title: 'Wave Rider\'s Paradise',
    location: 'Newport Beach, CA',
    distance: 50,
    availableDates: 'Apr 5-10',
    price: 180,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400'],
    category: 'surfing'
  },

  // Tiny Homes
  {
    id: '10',
    title: 'Cozy Modern Tiny Home',
    location: 'Portland, OR',
    distance: 200,
    availableDates: 'May 1-5',
    price: 85,
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'],
    category: 'tiny_homes'
  },
  {
    id: '11',
    title: 'Forest Tiny Cabin',
    location: 'Asheville, NC',
    distance: 150,
    availableDates: 'Jun 10-15',
    price: 75,
    rating: 4.4,
    images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop'],
    category: 'tiny_homes'
  },

  // Mansions
  {
    id: '12',
    title: 'Hollywood Hills Mansion',
    location: 'Los Angeles, CA',
    distance: 15,
    availableDates: 'Jul 1-7',
    price: 1500,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'],
    category: 'mansions'
  },
  {
    id: '13',
    title: 'Estate with Vineyard',
    location: 'Napa Valley, CA',
    distance: 70,
    availableDates: 'Aug 5-12',
    price: 1200,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'],
    category: 'mansions'
  },

  // Treehouses
  {
    id: '14',
    title: 'Riverside Treehouse',
    location: 'Portland, OR',
    distance: 180,
    availableDates: 'Sep 1-5',
    price: 140,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'],
    category: 'treehouses'
  },
  {
    id: '15',
    title: 'Forest Canopy Retreat',
    location: 'Seattle, WA',
    distance: 120,
    availableDates: 'Oct 10-15',
    price: 160,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'],
    category: 'treehouses'
  },

  // Camping
  {
    id: '16',
    title: 'Glacier National Park Camping',
    location: 'Montana',
    distance: 400,
    availableDates: 'Jun 15-20',
    price: 65,
    rating: 4.3,
    images: ['https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400'],
    category: 'camping'
  },
  {
    id: '17',
    title: 'Lake Tahoe Campground',
    location: 'California/Nevada',
    distance: 180,
    availableDates: 'Jul 20-25',
    price: 55,
    rating: 4.2,
    images: ['https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400'],
    category: 'camping'
  },

  // Beachfront
  {
    id: '18',
    title: 'Oceanfront Condo',
    location: 'Miami Beach, FL',
    distance: 80,
    availableDates: 'Nov 15-20',
    price: 280,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'],
    category: 'beachfront'
  },
  {
    id: '19',
    title: 'Seaside Villa',
    location: 'San Diego, CA',
    distance: 120,
    availableDates: 'Dec 5-10',
    price: 320,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'],
    category: 'beachfront'
  },

  // Farms
  {
    id: '20',
    title: 'Vineyard Farmhouse',
    location: 'Sonoma, CA',
    distance: 60,
    availableDates: 'May 5-10',
    price: 160,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400'],
    category: 'farms'
  },
  {
    id: '21',
    title: 'Countryside Barn Stay',
    location: 'Kentucky',
    distance: 200,
    availableDates: 'Jun 1-5',
    price: 110,
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400'],
    category: 'farms'
  },

  // Castles
  {
    id: '22',
    title: 'Medieval Castle Estate',
    location: 'San Francisco, CA',
    distance: 35,
    availableDates: 'Aug 1-7',
    price: 900,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1464822759844-d150f39ac1ac?w=400'],
    category: 'castles'
  },

  // Islands
  {
    id: '23',
    title: 'Private Island Paradise',
    location: 'Maui, HI',
    distance: 500,
    availableDates: 'Sep 10-17',
    price: 750,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'],
    category: 'islands'
  },
  {
    id: '24',
    title: 'Tropical Island Resort',
    location: 'Key West, FL',
    distance: 180,
    availableDates: 'Oct 5-12',
    price: 450,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'],
    category: 'islands'
  }
];

export const fetchProperties = async (filters: FilterOptions): Promise<Property[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProperties = [...mockProperties];

  // Apply filters
  if (filters.category && filters.category !== 'all') {
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