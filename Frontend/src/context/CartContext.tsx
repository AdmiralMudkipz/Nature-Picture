// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import cartService from '../services/cartService';
import { useUser } from './UserContext';

// Export the CartItem interface so it can be imported elsewhere
export interface CartItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  sellerEmail: string;
  sellerId?: string; // Add sellerId field to track who's selling the item
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  // Fetch cart data when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // Clear local cart when user logs out
      setItems([]);
    }
  }, [user]);

  // Fetch cart from backend
  const fetchCart = async (): Promise<void> => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const cartData = await cartService.getUserCart();
      
      // Transform backend data format to frontend format
      const transformedItems = cartData.map((item) => ({
        id: item.art.art_id.toString(),
        title: item.art.name,
        artist: `${item.art.user.first_name} ${item.art.user.last_name}`,
        price: typeof item.art.price === 'string' 
          ? parseFloat(item.art.price) 
          : Number(item.art.price),
        image: item.art.image || '',
        sellerEmail: item.art.user.email || `user_${item.art.user.user_id}@example.com`,
        sellerId: item.art.user.user_id.toString()
      }));
      
      setItems(transformedItems);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setError('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item: CartItem): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if user is trying to purchase their own art
      if (user && item.sellerId && user.user_id.toString() === item.sellerId) {
        setError("You cannot purchase your own artwork");
        setLoading(false);
        return;
      }
      
      if (user) {
        // Add to backend if logged in
        await cartService.addToCart(item.id);
        await fetchCart(); // Refresh cart from backend
      } else {
        // Store locally if not logged in
        setItems(prevItems => {
          // Check if item already exists
          const exists = prevItems.some(i => i.id === item.id);
          if (exists) return prevItems;
          return [...prevItems, item];
        });
      }
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      setError('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart
  const removeFromCart = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      if (user) {
        // Remove from backend if logged in
        await cartService.removeFromCart(id);
        await fetchCart(); // Refresh cart from backend
      } else {
        // Remove locally if not logged in
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      if (user) {
        // Clear backend cart if logged in
        await cartService.clearCart();
      }
      // Always clear local cart
      setItems([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
      setError('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      total,
      loading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};