<<<<<<< Updated upstream
<<<<<<< Updated upstream
// This is a React component for our About page
=======
// Twe dont need a product view ig im doing this 4 my own convenience
>>>>>>> Stashed changes
=======
// Twe dont need a product view ig im doing this 4 my own convenience
>>>>>>> Stashed changes
type Product = {
  id: number;
  name: string;
  image: string;
  seller: string;
  price: number;
  description: string;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  location: string;
>>>>>>> Stashed changes
=======
  location: string;
>>>>>>> Stashed changes
};

type ProductViewProps = {
  product: Product;
};
const ProductView = ({ product }: ProductViewProps) => {
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
  
  // This line makes our component available to other files
  export default ProductView; 