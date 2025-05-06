import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPortal from "../ReactPortal";
import { useUser } from "../../context/UserContext";
// Import our SQL sanitization utility
import {
  sanitizeSql,
  createSqlSafeHandler,
} from "../../utilities/sqlSanitization";

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
  const { user, isLoading } = useUser();

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [typeOfArt, setTypeOfArt] = useState("");
  const [county, setCounty] = useState("");
  const [state, setState] = useState("NJ");
  const [stock, setStock] = useState<number | null>(null);

  // Image handling
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setUploadStatus("Error: File size should not exceed 5MB");
        return;
      }

      const fileType = file.type;
      if (!fileType.match(/^image\/(jpeg|png|gif|webp)$/)) {
        setUploadStatus(
          "Error: Only JPG, PNG, GIF, and WEBP formats are supported"
        );
        return;
      }

      setSelectedImage(file);
      setUploadStatus("");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create handlers that apply SQL sanitization
  const handleTitleChange = createSqlSafeHandler(setTitle);
  const handleDescriptionChange = createSqlSafeHandler(setDescription);
  const handleCountyChange = createSqlSafeHandler(setCounty);

  // Handle price change (numeric fields don't need SQL sanitization)
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value === "" ? null : parseFloat(e.target.value));
  };

  // Handle stock change (numeric fields don't need SQL sanitization)
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock(e.target.value === "" ? null : parseInt(e.target.value, 10));
  };

  // Handle dropdown changes (don't need SQL sanitization as they're from fixed options)
  const handleTypeOfArtChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeOfArt(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus("Submitting...");

    // Check if user is null before proceeding
    if (!user) {
      setUploadStatus("Error: You must be logged in to add a listing.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", title); // Already sanitized by handleTitleChange
      formData.append("description", description); // Already sanitized by handleDescriptionChange
      formData.append("price", price ? price.toString() : "");
      formData.append("type_of_art", typeOfArt);
      formData.append("county", county); // Already sanitized by handleCountyChange
      formData.append("state", state);
      formData.append("stock_amount", stock ? stock.toString() : "");
      formData.append("user_id", user.user_id.toString());

      // Append image if selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // Send the data
      const response = await axios.post(
        "http://localhost:8000/base/artpieces/create/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Listing created successfully:", response.data);
      setUploadStatus("Success! Your listing has been created.");

      // Reset form
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setPrice(null);
        setTypeOfArt("");
        setStock(null);
        setCounty("");
        setState("NJ");
        setSelectedImage(null);
        setImagePreview(null);
        setUploadStatus("");
        handleClose();
      }, 1500);
    } catch (error) {
      console.error("Error creating listing:", error);
      setUploadStatus("Error: Failed to create listing. Please try again.");
    }
  };

  if (!isOpen) return null;
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>You must be logged in to add a listing.</div>;

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
              onChange={handleTitleChange} //
              required
            />

            <Label>Description:</Label>
            <Textarea
              value={description}
              onChange={handleDescriptionChange}
              required
            />

            <Label>Price ($):</Label>
            <Input
              type="number"
              value={price ?? ""}
              onChange={handlePriceChange}
              step="0.01"
              min="0"
              required
            />

            <Label>Stock:</Label>
            <Input
              type="number"
              value={stock ?? ""}
              onChange={handleStockChange}
              step="1"
              min="0"
              required
            />

            <Label>Type of Art</Label>
            <Select value={typeOfArt} onChange={handleTypeOfArtChange} required>
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

            <Label>County</Label>
            <Input
              type="text"
              value={county}
              onChange={handleCountyChange}
              required
            />

            <Label>State</Label>
            <Select value={state} onChange={handleStateChange} required>
              <option value="" disabled>
                Select State
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </Select>

            <Label>Upload Image:</Label>
            <FileInputContainer>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <FileInputLabel>Choose File</FileInputLabel>
            </FileInputContainer>

            {selectedImage && (
              <SelectedFileName>
                Selected: {selectedImage.name}
              </SelectedFileName>
            )}

            {imagePreview && (
              <ImagePreviewContainer>
                <img src={imagePreview} alt="Preview" />
              </ImagePreviewContainer>
            )}

            {uploadStatus && (
              <StatusMessage isError={uploadStatus.startsWith("Error")}>
                {uploadStatus}
              </StatusMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={uploadStatus === "Submitting..."}
            >
              {uploadStatus === "Submitting..." ? "Submitting..." : "Submit"}
            </SubmitButton>
          </StyledForm>
        </ModalContent>
      </ModalOverlay>
    </ReactPortal>
  );
};

// All styled components remain the same as your original code
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
  max-height: 90vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FileInputContainer = styled.div`
  position: relative;
  margin-top: 5px;
  display: inline-block;
`;

const FileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const FileInputLabel = styled.span`
  display: inline-block;
  padding: 8px 12px;
  background: #4c4c4c;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const SelectedFileName = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: #aaa;
`;

const ImagePreviewContainer = styled.div`
  margin-top: 10px;
  max-width: 100%;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    border: 1px solid #444;
  }
`;

const StatusMessage = styled.div<{ isError: boolean }>`
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isError ? "rgba(255, 77, 79, 0.1)" : "rgba(76, 175, 80, 0.1)"};
  color: ${(props) => (props.isError ? "#ff4d4f" : "#4CAF50")};
`;

export default AddListingModal;
