import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, ListGroup, Row, Col, Image, Card } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useUpdateCartsMutation } from "../../slices/cartsApiSlice";
import {
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseItemQty,
} from "../../slices/cartSlice";
import FormContainer from "../components/formContainer/FormContainer";
import "./index.css";
import { formatCurrency } from "../../utils/formatCurrency";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [updateCarts] = useUpdateCartsMutation();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart"));
    if (storedCartItems) {
      dispatch(setCartItems(storedCartItems));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCartHandler = async (item) => {
    try {
      await dispatch(addToCart({ ...item, qty: 1 }));
      await updateCarts({ items: cartItems }).unwrap();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const decreaseQtyHandler = (item) => {
    if (item.qty > 1) {
      dispatch(decreaseItemQty(item._id));
    } else {
      dispatch(removeFromCart(item._id));
    }
    updateCarts({ items: cartItems });
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
    updateCarts({ items: [] });
  };
  return (
    <FormContainer>
      <Row className="mb-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div>
              Your cart is empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={3} className="text-center">
                      <Image
                        src={`/images/products/${item.image_url}`}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={5}>
                      <h5>{item.name}</h5>
                      <p>{formatCurrency(item.price)}</p>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <Button
                        variant="outline-secondary"
                        onClick={() => decreaseQtyHandler(item)}
                      >
                        <FaMinus />
                      </Button>
                      <span className="mx-2">{item.qty}</span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => addToCartHandler(item)}
                      >
                        <FaPlus />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Cart Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items )
                  </h5>
                  {formatCurrency(
                    cartItems.reduce(
                      (acc, item) => acc + item.price * item.qty,
                      0
                    )
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="danger"
                    className="w-100"
                    disabled={cartItems.length === 0}
                    onClick={clearCartHandler}
                  >
                    Clear Cart
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/address">
                    <Button
                      type="button"
                      variant="primary"
                      className="w-100"
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Cart;
