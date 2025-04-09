import './SellerInfo.css';
import profilePicture from '../profile-pic.jpeg';

// Type definition for the seller object
type Seller = {
  name: string;
  profilePic: string;
  rating: number;
  reviewsCount: number;
};

const SellerInfo = () => {
  // Placeholder data (replace this with API data once it's available)
  const seller: Seller = {
    name: 'Jane Doe',
    profilePic: profilePicture,  // Placeholder profile picture
    rating: 4.5,
    reviewsCount: 120,
  };

  return (
    <div className="seller-info">
      <img src={seller.profilePic} alt={seller.name} className="profile-pic" />
      <h1 className="seller-name">{seller.name}</h1>
      <div className="rating">
        <span className="reviews-count">({seller.reviewsCount} reviews)</span>
      </div>
    </div>
  );
};

export default SellerInfo;




