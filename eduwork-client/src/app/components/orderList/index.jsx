import { Card, Row, Col, Container } from "react-bootstrap";
import { useFetchOrdersQuery } from "../../../slices/ordersApiSlice";
import FormContainer from "../formContainer/FormContainer";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/formatCurrency";

const OrderList = () => {
  const { data: ordersData, error, isLoading } = useFetchOrdersQuery();
  const orders = ordersData?.data || [];
  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching orders:", error);
    return <div>Error: {error.message || "Something went wrong"}</div>;
  }

  const lastOrder = orders[orders.length - 1];
  const calculateTotalAmount = (orderItems) => {
    return orderItems.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  };

  return (
    <FormContainer>
      <Container>
        <h1 className="text-center mb-4">Your Last Order</h1>
        {lastOrder ? (
          <Card className="shadow-sm">
            <Card.Header as="h5">
              <strong>Order ID:</strong> {lastOrder.order_number}
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <strong>Status:</strong> {lastOrder.status}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Total Amount:</strong>{" "}
                  {formatCurrency(
                    calculateTotalAmount(lastOrder.order_items) +
                      lastOrder.delivery_fee
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Billed To:</strong>
                  <div>
                    <strong>{userInfo.user.username}</strong>
                  </div>
                  <div>
                    {lastOrder.address.detail}, {lastOrder.address.province},
                    <br />
                    {lastOrder.address.regency}, {lastOrder.address.subdistrict}
                    ,
                    <br />
                    {lastOrder.address.ward}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Payment To:</strong>
                  <div>
                    Zikri Azzuri
                    <br />
                    BCA
                    <br />
                    xxx-xxx-1233
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <div className="text-center">No orders found.</div>
        )}
      </Container>
    </FormContainer>
  );
};
export default OrderList;
