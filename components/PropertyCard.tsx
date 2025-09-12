import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '../types';
import { StarIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/CoreIcons';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div onClick={handleCardClick} className="group cursor-pointer">
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <button onClick={handleLikeClick} className="absolute top-2 right-2 text-white">
          <HeartIcon
            className="h-6 w-6"
            fill={isLiked ? '#FF385C' : 'rgba(0,0,0,0.5)'}
            stroke="white"
            strokeWidth="2"
          />
        </button>
        {property.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRightIcon className="h-4 w-4" />
            </button>
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {property.images.map((_, index) => (
                    <div key={index} className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate">{property.location}</h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <StarIcon className="h-3.5 w-3.5" />
            <span className="text-sm text-gray-800">{property.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{property.distance} kilometers away</p>
        <p className="text-sm text-gray-500">{property.availableDates}</p>
        <p className="mt-1">
          <span className="font-semibold">${property.price}</span>
          <span className="text-sm text-gray-800"> night</span>
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;