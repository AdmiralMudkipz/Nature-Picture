import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { FaTrash, FaEnvelope } from 'react-icons/fa';

const Cart: React.FC = () => {
  const { items, removeFromCart, clearCart, total } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (items.length === 0) return;

    setIsSending(true);
    try {
      // Initialize EmailJS with your public key
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

      // Group items by seller
      const itemsBySeller = items.reduce((acc, item) => {
        if (!acc[item.sellerEmail]) {
          acc[item.sellerEmail] = [];
        }
        acc[item.sellerEmail].push(item);
        return acc;
      }, {} as Record<string, typeof items>);

      // Send email to each seller
      for (const [sellerEmail, sellerItems] of Object.entries(itemsBySeller)) {
        const templateParams = {
          to_email: sellerEmail,
          from_name: `${user.first_name} ${user.last_name}`,
          from_email: user.email,
          items: sellerItems.map(item => ({
            title: item.title,
            price: item.price,
            image: item.image
          })),
          total: sellerItems.reduce((sum, item) => sum + item.price, 0),
          message: message
        };

        await emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          templateParams
        );
      }

      clearCart();
      alert('Your interest has been sent to the sellers!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <CartContainer>
      <CartHeader>Your Cart</CartHeader>
      {items.length === 0 ? (
        <EmptyCart>Your cart is empty</EmptyCart>
      ) : (
        <>
          <CartItems>
            {items.map((item) => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.title} />
                <ItemDetails>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemArtist>by {item.artist}</ItemArtist>
                  <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                </ItemDetails>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </RemoveButton>
              </CartItem>
            ))}
          </CartItems>
          <TotalSection>
            <TotalAmount>Total: ${total.toFixed(2)}</TotalAmount>
            <MessageInput
              placeholder="Add a message for the sellers..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SendButton onClick={handleSendEmail} disabled={isSending}>
              <FaEnvelope />
              {isSending ? 'Sending...' : 'Contact Sellers'}
            </SendButton>
          </TotalSection>
        </>
      )}
    </CartContainer>
  );
};

const CartContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: white;
`;

const CartHeader = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const EmptyCart = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
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
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ItemArtist = styled.p`
  margin: 0.5rem 0;
  color: #888;
`;

const ItemPrice = styled.p`
  margin: 0;
  font-weight: bold;
  color: #4CAF50;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;

  &:hover {
    color: #ff0000;
  }
`;

const TotalSection = styled.div`
  background: #2c2c2c;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TotalAmount = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
`;

const MessageInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #1c1c1c;
  color: white;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SendButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #45a049;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

export default Cart; 