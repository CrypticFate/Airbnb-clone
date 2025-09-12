import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  id: string;
  title: string;
  location: string;
  distance: number;
  availableDates: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
  description?: string;
  amenities?: string[];
  host?: {
    name: string;
    avatar?: string;
    joinedDate?: Date;
    isSuperhost?: boolean;
  };
  capacity?: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
      min: 0,
    },
    availableDates: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    images: [{
      type: String,
      required: true,
    }],
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amenities: [{
      type: String,
    }],
    host: {
      name: {
        type: String,
        default: 'Host',
      },
      avatar: String,
      joinedDate: {
        type: Date,
        default: Date.now,
      },
      isSuperhost: {
        type: Boolean,
        default: false,
      },
    },
    capacity: {
      guests: {
        type: Number,
        default: 4,
      },
      bedrooms: {
        type: Number,
        default: 2,
      },
      beds: {
        type: Number,
        default: 2,
      },
      bathrooms: {
        type: Number,
        default: 1,
      },
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
PropertySchema.index({ location: 'text', title: 'text' });
PropertySchema.index({ category: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ rating: -1 });

export const Property = mongoose.model<IProperty>('Property', PropertySchema);
