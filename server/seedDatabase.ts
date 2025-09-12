import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Property } from './models/Property';
import { Category } from './models/Category';

dotenv.config();

const categories = [
  { id: 'amazing_views', label: { en: 'Amazing views', bn: 'আশ্চর্যজনক দৃশ্য' }, iconName: 'AmazingViewsIcon', order: 1 },
  { id: 'tiny_homes', label: { en: 'Tiny homes', bn: 'ছোট বাড়ি' }, iconName: 'TinyHomesIcon', order: 2 },
  { id: 'chefs_kitchens', label: { en: 'Chef\'s kitchens', bn: 'শেফের রান্নাঘর' }, iconName: 'ChefsKitchensIcon', order: 3 },
  { id: 'surfing', label: { en: 'Surfing', bn: 'সার্ফিং' }, iconName: 'SurfingIcon', order: 4 },
  { id: 'mansions', label: { en: 'Mansions', bn: 'প্রাসাদ' }, iconName: 'MansionsIcon', order: 5 },
  { id: 'luxe', label: { en: 'Luxe', bn: 'বিলাসবহুল' }, iconName: 'LuxeIcon', order: 6 },
  { id: 'treehouses', label: { en: 'Treehouses', bn: 'গাছবাড়ি' }, iconName: 'TreehousesIcon', order: 7 },
  { id: 'camping', label: { en: 'Camping', bn: 'ক্যাম্পিং' }, iconName: 'CampingIcon', order: 8 },
  { id: 'beachfront', label: { en: 'Beachfront', bn: 'সৈকতের সামনে' }, iconName: 'BeachfrontIcon', order: 9 },
  { id: 'farms', label: { en: 'Farms', bn: 'খামার' }, iconName: 'FarmsIcon', order: 10 },
  { id: 'castles', label: { en: 'Castles', bn: 'দুর্গ' }, iconName: 'CastlesIcon', order: 11 },
  { id: 'islands', label: { en: 'Islands', bn: 'দ্বীপ' }, iconName: 'IslandsIcon', order: 12 },
];

const locations = [
  'Phuket, Thailand',
  'Bali, Indonesia', 
  'Santorini, Greece',
  'Kyoto, Japan',
  'Paris, France',
  'Rome, Italy',
  'New York, USA',
  'London, UK',
  'Dubai, UAE',
  'Maldives',
  'Barcelona, Spain',
  'Amsterdam, Netherlands'
];

const generateProperties = (count: number) => {
  const properties = [];
  
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const location = locations[i % locations.length];
    const rating = Number((4.5 + Math.random() * 0.5).toFixed(2));
    const price = Math.floor(Math.random() * 300) + 100;
    const distance = Math.floor(Math.random() * 2000) + 100;

    const property = {
      id: `prop-${i + 1}`,
      title: `${category.label.en} in ${location}`,
      location,
      distance,
      availableDates: `Dec ${Math.floor(Math.random() * 10) + 1} - ${Math.floor(Math.random() * 10) + 11}`,
      price,
      rating,
      images: Array.from({ length: 5 }, (_, j) => `https://picsum.photos/seed/${i + 1}_${j}/400/300`),
      category: category.id,
      description: `Experience the perfect blend of comfort and luxury in this beautifully designed ${category.label.en.toLowerCase()} space. Located in the heart of ${location}, this property offers stunning views and modern amenities.`,
      amenities: ['Wifi', 'Free parking', 'Air conditioning', 'Kitchen', 'Washer', 'Dryer'],
      host: {
        name: `Host ${i % 10 + 1}`,
        joinedDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        isSuperhost: Math.random() > 0.7,
      },
      capacity: {
        guests: Math.floor(Math.random() * 6) + 2,
        bedrooms: Math.floor(Math.random() * 3) + 1,
        beds: Math.floor(Math.random() * 4) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
      },
      coordinates: {
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
      },
    };
    
    properties.push(property);
  }
  
  return properties;
};

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Property.deleteMany({});
    await Category.deleteMany({});

    // Seed categories
    console.log('Seeding categories...');
    await Category.insertMany(categories);
    console.log(`✅ Seeded ${categories.length} categories`);

    // Generate and seed properties
    console.log('Seeding properties...');
    const properties = generateProperties(120);
    await Property.insertMany(properties);
    console.log(`✅ Seeded ${properties.length} properties`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
