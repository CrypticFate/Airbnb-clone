import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  id: string;
  label: {
    en: string;
    bn: string;
  };
  iconName: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      bn: {
        type: String,
        required: true,
        trim: true,
      },
    },
    iconName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for ordering
CategorySchema.index({ order: 1, isActive: 1 });

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
