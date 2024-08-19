import { useState, useEffect } from "react";
import { Button, Col, Row, Card, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchAddressesQuery } from "../../../slices/addressesApiSlice";
import { clearCart } from "../../../slices/cartSlice";
import { useCreateOrderMutation } from "../../../slices/ordersApiSlice";
import { formatCurrency } from "../../../utils/formatCurrency";

import FormContainer from "../formContainer/FormContainer";
import "./index.css";

const Checkout = () => {
  const [deliveryFee, setDeliveryFee] = useState(20000);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [subTotal, setSubTotal] = useState(0);

  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const addressId = query.get("address");

  const { data: addressData } = useFetchAddressesQuery();

  const addresses = addressData?.data || [];
  const cart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (addressId) {
      const address = addresses.find((addr) => addr._id === addressId);
      setSelectedAddress(address);
    }
  }, [addressId, addresses]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    setSubTotal(total);
  }, [cart]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (!storedCart || storedCart.length === 0) {
      navigate("/");
    }
  }, [navigate]);

  const handleCheckout = async () => {
    if (!selectedAddress) return;

    const orderData = {
      deliveryFee,
      address: selectedAddress._id,
      cartItems: cart,
    };

    try {
      await createOrder(orderData).unwrap();
      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  if (!selectedAddress) return <div>Loading...</div>;

  return (
    <FormContainer>
      <h1 className="text-center mb-4">Checkout</h1>
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Delivery Address</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {selectedAddress?.name}
              </Card.Text>
              <Card.Text>
                <strong>Detail Address:</strong>{" "}
                {`${selectedAddress?.detail}, ${selectedAddress?.province}, ${selectedAddress?.regency}, ${selectedAddress?.subdistrict}, ${selectedAddress?.ward}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Sub Total</Col>
                    <Col className="text-end">{formatCurrency(subTotal)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Delivery Fee</Col>
                    <Col className="text-end">
                      {formatCurrency(deliveryFee)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col className="text-end">
                      {formatCurrency(subTotal + deliveryFee)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <div className="d-grid gap-2 mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  Checkout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Checkout;
