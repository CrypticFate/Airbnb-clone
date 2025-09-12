
import React from 'react';
import PropertyCard from './PropertyCard';
import type { Property } from '../types';

interface PropertyListingsProps {
  properties: Property[];
  isLoading: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="animate-pulse">
    <div className="aspect-square bg-gray-300 rounded-xl"></div>
    <div className="h-4 bg-gray-300 rounded mt-4 w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded mt-2 w-1/4"></div>
  </div>
);

const PropertyListings: React.FC<PropertyListingsProps> = ({ properties, isLoading }) => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
          : properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
      </div>
       { !isLoading && properties.length === 0 && (
        <div className="text-center col-span-full py-20">
            <h2 className="text-2xl font-semibold">No results found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
        </div>
       )}
    </div>
  );
};

export default PropertyListings;
