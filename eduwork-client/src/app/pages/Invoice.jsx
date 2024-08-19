import { useParams } from "react-router-dom";
import { useFetchInvoiceByIdQuery } from "../../slices/invoicesApiSlice";
import FormContainer from "../components/formContainer/FormContainer";
import { Button, ListGroup, Row, Col, Card } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";

const Invoice = () => {
  const { order_id } = useParams();
  const {
    data: invoice,
    error,
    isLoading,
  } = useFetchInvoiceByIdQuery(order_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching invoice:", error);
    return <div>Error: {error.message || "Something went wrong"}</div>;
  }

  return (
    <FormContainer>
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="mb-3">Invoice</h1>
          <Card>
            <Card.Body>
              <Card.Title>Order #{invoice.order.order_number}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Date:</strong>{" "}
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total:</strong> {formatCurrency(invoice.total)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Delivery Fee:</strong>{" "}
                  {formatCurrency(invoice.delivery_fee)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Sub Total:</strong>{" "}
                  {formatCurrency(invoice.sub_total)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status Payment:</strong> {invoice.payment_status}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Invoice;
