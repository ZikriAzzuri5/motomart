import { Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateCartsMutation } from "../../../slices/cartsApiSlice";
import { addToCart } from "../../../slices/cartSlice";
import { formatCurrency } from "../../../utils/formatCurrency";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateCarts] = useUpdateCartsMutation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleAddToCart = async (product) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const updatedCartItems = [...cartItems, { ...product, qty: 1 }];
    dispatch(addToCart({ ...product, qty: 1 }));

    try {
      await updateCarts({ items: updatedCartItems }).unwrap();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  if (!products.length) {
    return <div>No products found</div>;
  }

  return (
    <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={`images/products/${product.image_url}`}
              alt={product.name}
            />
            <Card.Body className="d-flex flex-column">
              <div className="flex-grow-1">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{formatCurrency(product.price)}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.stock}</Card.Text>
              </div>
              <Button variant="dark" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
