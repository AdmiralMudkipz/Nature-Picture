import profilePicture from "../SellerProfileInfo/profile-pic.jpeg";

// Type definition for the seller object
type Buyer = {
  name: string;
  profilePic: string;
  rating: number;
  reviewsCount: number;
};

const BuyerInfo = () => {
  // Placeholder data (replace this with API data once it's available)
  const buyer: Buyer = {
    name: "Buyer Profile",
    profilePic: profilePicture, // Placeholder profile picture
    rating: 3.5,
    reviewsCount: 130,
  };

  return (
    <div className="seller-info">
      <img src={buyer.profilePic} alt={buyer.name} className="profile-pic" />
      <h1 className="seller-name">{buyer.name}</h1>
      <div className="rating">
        <span className="reviews-count">({buyer.reviewsCount} reviews)</span>
      </div>
    </div>
  );
};

export default BuyerInfo;
