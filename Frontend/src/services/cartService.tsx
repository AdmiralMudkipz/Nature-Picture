// src/services/cartService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/base/cart';

interface CartItem {
  cart_art_id: number;
  cart: number;
  art: {
    art_id: number;
    name: string;
    description: string | null;
    image: string | null;
    stock_amount: number;
    price: string | number;
    user: {
      user_id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

const cartService = {
  // Get user cart items
  getUserCart: async (): Promise<CartItem[]> => {
    try {
      const response = await axios.get<CartItem[]>(`${API_URL}/`, { 
        withCredentials: true 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (artId: string | number): Promise<{ message: string }> => {
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}/add-to-cart/${artId}/`, 
        {}, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (artId: string | number): Promise<{ message: string }> => {
    try {
      const response = await axios.delete<{ message: string }>(
        `${API_URL}/remove/${artId}/`, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async (): Promise<{ message: string }> => {
    try {
      const response = await axios.delete<{ message: string }>(
        `${API_URL}/clear/`, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export default cartService;