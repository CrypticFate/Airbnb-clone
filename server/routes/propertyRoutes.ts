import express from 'express';
import { Property } from '../models/Property';
import type { FilterOptions } from '../../types';

const router = express.Router();

// GET /api/properties - Get all properties with filtering
router.get('/', async (req, res) => {
  try {
    const {
      category,
      location,
      minPrice,
      maxPrice,
      minRating,
      guests,
      page = 1,
      limit = 20,
    } = req.query;

    // Build filter object
    const filter: any = { isActive: true };

    if (category && category !== '') {
      filter.category = category;
    }

    if (location) {
      filter.$or = [
        { location: { $regex: location, $options: 'i' } },
        { title: { $regex: location, $options: 'i' } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    if (guests) {
      filter['capacity.guests'] = { $gte: Number(guests) };
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get properties with pagination
    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Error fetching properties', error });
  }
});

// GET /api/properties/:id - Get single property
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findOne({ id, isActive: true });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Error fetching property', error });
  }
});

// POST /api/properties - Create new property
router.post('/', async (req, res) => {
  try {
    const propertyData = req.body;
    
    // Generate unique ID if not provided
    if (!propertyData.id) {
      propertyData.id = `prop-${Date.now()}`;
    }

    const property = new Property(propertyData);
    const savedProperty = await property.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Property with this ID already exists' });
    } else {
      res.status(500).json({ message: 'Error creating property', error });
    }
  }
});

// PUT /api/properties/:id - Update property
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const property = await Property.findOneAndUpdate(
      { id, isActive: true },
      updateData,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Error updating property', error });
  }
});

// DELETE /api/properties/:id - Soft delete property
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findOneAndUpdate(
      { id, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Error deleting property', error });
  }
});

export default router;
