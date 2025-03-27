import "./ProductCard.css";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
