import React, { useState } from "react";
import ReactPortal from "../../ReactPortal"; // Use your existing ReactPortal component
import "./AddListModal.css"; // Modal styles

// Define the props for the AddListingModal component
interface AddListingModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode; // Add children as an optional prop
}

// Take the props from the AddListingModalProps interface
const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [typeOfArt, setTypeOfArt] = useState("");
  const [stock, setStock] = useState<number | null>(null);

  // This function handles form submission. When the backend gets connected, we will be able to send data to the database this way
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing = {
      title,
      description,
      price,
    };

    // Reset form fields after submission
    setTitle("");
    setDescription("");
    setPrice(null);
    setTypeOfArt("");
    setStock(null);

    // this is where we will have to send the data to the backend
    console.log("New Art Listing:", newListing);
    handleClose(); // Close the modal after submission
  };

  return (
    // Render the modal using ReactPortal
    <ReactPortal wrapperId="add-listing-modal">
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleClose}>
              X
            </button>
            {children} {/* Render children here */}
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Price ($):</label>
              <input
                type="number"
                value={price ?? ""} // If price is null, show an empty string
                onChange={(e) =>
                  setPrice(
                    e.target.value === "" ? null : parseFloat(e.target.value)
                  )
                }
                step="0.01"
                min="0"
                required
              />

              <label>Stock:</label>
              <input
                type="number"
                value={stock ?? ""} // If stock is null, show an empty string
                onChange={(e) =>
                  setStock(
                    e.target.value === "" ? null : parseInt(e.target.value, 10)
                  )
                }
                step="1"
                min="0"
                required
              />

              <label>Type of Art</label>
              <select
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
              </select>

              <label>Upload Image:</label>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </ReactPortal>
  );
};

export default AddListingModal;
