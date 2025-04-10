import styled from "styled-components";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
};

// Styled components
const Card = styled.div`
  width: 220px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  text-align: center;
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  font-size: 16px;
`;

const Name = styled.span`
  font-weight: bold;
  text-align: left;
  flex: 1;
`;

const Price = styled.span`
  font-weight: bold;
  color: #007bff;
  text-align: right;
`;

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <Image src={product.image} alt={product.name} />
      <Info>
        <Name>{product.name}</Name>
        <Price>${product.price.toFixed(2)}</Price>
      </Info>
    </Card>
  );
};

export default ProductCard;
