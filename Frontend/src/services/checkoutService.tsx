// src/services/checkoutService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/base/purchase_order';

interface CheckoutResponse {
  message: string;
  order: any;
}

interface PurchaseHistoryItem {
  purchase_order_id: number;
  date_purchased: string;
  buyer: {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  art_pieces: Array<{
    purchase_order_art_id: number;
    art: {
      art_id: number;
      name: string;
      description: string | null;
      image: string | null;
      stock_amount: number;
      price: string | number;
      type_of_art: string;
    }
  }>;
}

const checkoutService = {
  // Process checkout
  checkout: async (orderNotes?: string): Promise<CheckoutResponse> => {
    try {
      const response = await axios.post<CheckoutResponse>(
        `${API_URL}/checkout/`, 
        { order_notes: orderNotes || '' }, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error during checkout:', error);
      throw error.response?.data?.error || 'Failed to process your order';
    }
  },

  // Get purchase history
  getPurchaseHistory: async (): Promise<PurchaseHistoryItem[]> => {
    try {
      const response = await axios.get<PurchaseHistoryItem[]>(
        `${API_URL}/purchase-history/`, 
        { withCredentials: true }
      );
      return response.data || []; // Ensure we always return an array
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      return []; // Return empty array on error
    }
  }
};

export default checkoutService;