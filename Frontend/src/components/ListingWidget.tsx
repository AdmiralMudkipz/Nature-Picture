import React, { useState } from "react";
import ReactPortal from "./ReactPortal";
import Header from "./SellerProfileInfo/Header/Header";

interface ListingWidgetProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode; // Add children as an optional prop
}

const ListingWidget: React.FC<ListingWidgetProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | null>(null);
      const [typeOfArt, setTypeOfArt] = useState("");
      const [stock, setStock] = useState<number | null>(null);
      return (
        <div className="page">
          <h1>Viewing Product</h1>
          <h2>{product.name}</h2>
          <h4>{product.seller}</h4>
          <h3>${product.price.toFixed(2)}</h3>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
        </div>
      );
};
export default ListingWidget;