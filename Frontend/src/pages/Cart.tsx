import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY");

const Cart: React.FC = () => {
  const { items, removeFromCart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset error state when items change
    setError(null);
  }, [items]);

  const handleSendEmail = async () => {
    if (items.length === 0) {
      setError('Your cart is empty!');
      return;
    }

    if (!user) {
      setError('Please log in to place an order');
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      // Group items by seller email
      const itemsBySeller = items.reduce((acc, item) => {
        if (!acc[item.sellerEmail]) {
          acc[item.sellerEmail] = [];
        }
        acc[item.sellerEmail].push(item);
        return acc;
      }, {} as Record<string, typeof items>);

      // Send email to each seller
      for (const [sellerEmail, sellerItems] of Object.entries(itemsBySeller)) {
        const totalPrice = sellerItems.reduce((sum, item) => sum + item.price, 0);
        
        const templateParams = {
          to_email: sellerEmail,
          from_name: user.username,
          from_email: user.email,
          message: message || 'No additional message provided.',
          items: sellerItems.map(item => ({
            title: item.title,
            artist: item.artist,
            price: item.price
          })),
          total_price: totalPrice
        };

        await emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          templateParams
        );
      }

      alert('Order placed successfully! Sellers will contact you shortly.');
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (items.length === 0) {
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
        <ClearCartButton onClick={clearCart}>
          <FaTrash /> Clear Cart
        </ClearCartButton>
      </CartHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <CartItems>
        {items.map((item) => (
          <CartItem key={item.id}>
            <ItemImage src={item.image} alt={item.title} />
            <ItemDetails>
              <h3>{item.title}</h3>
              <p>by {item.artist}</p>
              <p>${item.price.toFixed(2)}</p>
            </ItemDetails>
            <RemoveButton onClick={() => removeFromCart(item.id)}>
              <FaTrash />
            </RemoveButton>
          </CartItem>
        ))}
      </CartItems>

      <MessageInput
        placeholder="Add a message for the sellers (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <CartSummary>
        <TotalAmount>
          Total: ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
        </TotalAmount>
        <CheckoutButton 
          onClick={handleSendEmail} 
          disabled={isSending || !user}
        >
          {!user ? 'Please Log In' : isSending ? 'Processing...' : 'Place Order'}
        </CheckoutButton>
      </CartSummary>
    </CartContainer>
  );
};

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

const ClearCartButton = styled.button`
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

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #cc0000;
  }
`;

const MessageInput = styled.textarea`
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

const CheckoutButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

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
  min-height: 100vh;
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

export default Cart; 