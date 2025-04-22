import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPortal from "../ReactPortal"; // Make sure this still points to your portal logic
import { useUser } from "../../context/UserContext"; // Import the custom hook to access the user

interface AddListingModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
  const { user, isLoading } = useUser(); // Access user from context

  // If user is still loading or not logged in, return null or display a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You must be logged in to add a listing.</div>; // Show a message if user is not logged in
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [typeOfArt, setTypeOfArt] = useState("");
  const [county, setCounty] = useState("");
  const [state, setState] = useState("NJ"); // Default to NJ if all listings are in NJ

  const [stock, setStock] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the new listing object
    const newListing = {
      name: title,
      description,
      price,
      type_of_art: typeOfArt,
      county,
      state,
      stock_amount: stock,
      user_id: user.user_id,
    };

    try {
      // Send the data to the backend using Axios
      const response = await axios.post(
        "http://localhost:8000/base/artpieces/create/",
        newListing,
        { withCredentials: true } // Include credentials for session management
      );
      console.log("Listing created successfully:", response.data);

      // Reset form fields
      setTitle("");
      setDescription("");
      setPrice(null);
      setTypeOfArt("");
      setStock(null);
      setCounty("");

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error creating listing:", error);
      // You can show an error message to the user here if desired
    }
  };

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="add-listing-modal">
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={handleClose}>X</CloseButton>
          {children}
          <StyledForm onSubmit={handleSubmit}>
            <Label>Title:</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Label>Description:</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Label>Price ($):</Label>
            <Input
              type="number"
              value={price ?? ""}
              onChange={(e) =>
                setPrice(
                  e.target.value === "" ? null : parseFloat(e.target.value)
                )
              }
              step="0.01"
              min="0"
              required
            />

            <Label>Stock:</Label>
            <Input
              type="number"
              value={stock ?? ""}
              onChange={(e) =>
                setStock(
                  e.target.value === "" ? null : parseInt(e.target.value, 10)
                )
              }
              step="1"
              min="0"
              required
            />

            <Label>Type of Art</Label>
            <Select
              value={typeOfArt}
              onChange={(e) => setTypeOfArt(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Type of Art
              </option>
              <option value="photography">Photography</option>
              <option value="print">Print</option>
              <option value="sculpture">Sculpture</option>
              <option value="painting">Painting</option>
              <option value="ceramics">Ceramics</option>
              <option value="digital">Other</option>
            </Select>

            <Label>Location</Label>
            <Select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="atlantic">Atlantic</option>
              <option value="bergen">Bergen</option>
              <option value="burlington">Burlington</option>
              <option value="camden">Camden</option>
              <option value="cape-may">Cape May</option>
              <option value="cumberland">Cumberland</option>
              <option value="essex">Essex</option>
              <option value="gloucester">Gloucester</option>
              <option value="hudson">Hudson</option>
              <option value="hunterdon">Hunterdon</option>
              <option value="mercer">Mercer</option>
              <option value="middlesex">Middlesex</option>
              <option value="monmouth">Monmouth</option>
              <option value="morris">Morris</option>
              <option value="ocean">Ocean</option>
              <option value="passaic">Passaic</option>
              <option value="salem">Salem</option>
              <option value="somerset">Somerset</option>
              <option value="sussex">Sussex</option>
              <option value="union">Union</option>
              <option value="warren">Warren</option>
              {/* Add other counties */}
            </Select>
            <Label>State</Label>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="NJ">New Jersey</option>
              {/* Add other states here if needed */}
            </Select>

            <Label>Upload Image:</Label>
            {/* You can add <input type="file" /> here later if needed */}

            <SubmitButton type="submit">Submit</SubmitButton>
          </StyledForm>
        </ModalContent>
      </ModalOverlay>
    </ReactPortal>
  );
};

export default AddListingModal;

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  color: black;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 8px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  margin-top: 5px;
  padding: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  margin-top: 5px;
  padding: 8px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid #000;
  cursor: pointer;
`;
