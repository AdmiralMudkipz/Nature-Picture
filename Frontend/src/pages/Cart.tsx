// src/pages/Cart.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaSpinner } from 'react-icons/fa';
import checkoutService from '../services/checkoutService';

const Cart: React.FC = () => {
  const { items, removeFromCart, clearCart, total, loading, error } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async (): Promise<void> => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (items.length === 0) {
      setCheckoutError('Your cart is empty!');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      // Process checkout through backend API
      const response = await checkoutService.checkout(message);
      
      // Show success message
      alert('Order placed successfully! Thank you for your purchase.');
      
      // Clear cart after successful order (backend already cleared the cart in database)
      await clearCart();
      
      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Error during checkout:', error);
      setCheckoutError(typeof error === 'string' ? error : 'There was an error processing your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Render loading state
  if (loading && items.length === 0) {
    return (
      <LoadingContainer>
        <FaSpinner className="spinner" />
        <LoadingText>Loading your cart...</LoadingText>
      </LoadingContainer>
    );
  }

  // If cart is empty
  if (items.length === 0 && !loading) {
    return (
      <EmptyCartContainer>
        <EmptyCartText>Your cart is empty</EmptyCartText>
        <ContinueShoppingButton onClick={() => navigate('/')}>
          Continue Shopping
        </ContinueShoppingButton>
      </EmptyCartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <h2>Your Cart</h2>
        <ClearCartButton onClick={() => clearCart()} disabled={loading || isCheckingOut}>
          <FaTrash /> Clear Cart
        </ClearCartButton>
      </CartHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {checkoutError && <ErrorMessage>{checkoutError}</ErrorMessage>}
      
      <CartItems>
        {items.map((item) => (
          <CartItem key={item.id}>
            <ItemImage src={item.image} alt={item.title} onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/100?text=No+Image';
            }} />
            <ItemDetails>
              <h3>{item.title}</h3>
              <p>by {item.artist}</p>
              <p>${item.price.toFixed(2)}</p>
            </ItemDetails>
            <RemoveButton 
              onClick={() => removeFromCart(item.id)} 
              disabled={loading || isCheckingOut}
            >
              <FaTrash />
            </RemoveButton>
          </CartItem>
        ))}
      </CartItems>

      <MessageInput
        placeholder="Add order notes (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isCheckingOut}
      />

      <CartSummary>
        <TotalAmount>
          Total: ${total.toFixed(2)}
        </TotalAmount>
        <CheckoutButton 
          onClick={handleCheckout} 
          disabled={isCheckingOut || loading || !user}
        >
          {!user ? 'Please Log In' : isCheckingOut ? (
            <>
              <FaSpinner className="spinner" /> Processing...
            </>
          ) : (
            <>
              <FaShoppingBag /> Complete Order
            </>
          )}
        </CheckoutButton>
      </CartSummary>
    </CartContainer>
  );
};

// Styled components
const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1c1c1c;
  min-height: 100vh;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: #ffffff;

  h2 {
    margin: 0;
  }
`;

const ClearCartButton = styled.button<{ disabled?: boolean }>`
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #cc0000;
  }

  &:disabled {
    background: #777;
    cursor: not-allowed;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #2c2c2c;
  border-radius: 8px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex: 1;
  color: #ffffff;

  h3 {
    margin: 0 0 0.5rem 0;
  }

  p {
    margin: 0;
    color: #b0b0b0;
  }
`;

const RemoveButton = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #cc0000;
  }

  &:disabled {
    color: #777;
    cursor: not-allowed;
  }
`;

const MessageInput = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  background: #2c2c2c;
  color: #ffffff;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #4c4c4c;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #2c2c2c;
  border-radius: 8px;
`;

const TotalAmount = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CheckoutButton = styled.button<{ disabled?: boolean }>`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #1c1c1c;
  color: #ffffff;
`;

const EmptyCartText = styled.h2`
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #1c1c1c;
  color: #ffffff;

  .spinner {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
`;

export default Cart;