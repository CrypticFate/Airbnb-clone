import type { Property, FilterOptions } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const fetchProperties = async (filters: FilterOptions): Promise<Property[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.category) {
      queryParams.append('category', filters.category);
    }
    
    if (filters.location) {
      queryParams.append('location', filters.location);
    }

    if (filters.guests) {
      const totalGuests = filters.guests.adults + filters.guests.children;
      if (totalGuests > 0) {
        queryParams.append('guests', totalGuests.toString());
      }
    }
    
    // --- FIX START: Add check-in and check-out dates to the query ---
    if (filters.checkIn) {
      queryParams.append('checkIn', filters.checkIn.toISOString());
    }
    if (filters.checkOut) {
      queryParams.append('checkOut', filters.checkOut.toISOString());
    }
    // --- FIX END ---

    // Add other potential filters
    queryParams.append('limit', '20');
    queryParams.append('page', '1');

    const url = `${API_BASE_URL}/properties?${queryParams.toString()}`;
    console.log('Fetching properties from URL:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`API response not OK: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    
    // Fallback to empty array if API is not available
    // In production, you might want to show an error message to the user
    return [];
  }
};

// ... (the rest of the file remains the same)

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
};

export const createProperty = async (property: Omit<Property, '_id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

export const updateProperty = async (id: string, property: Partial<Property>): Promise<Property> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};