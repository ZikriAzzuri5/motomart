import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useFetchInvoicesQuery,
  useUpdateInvoiceAndOrderMutation,
} from "../../../slices/invoicesApiSlice";
import { formatCurrency } from "../../../utils/formatCurrency";
import FormContainer from "../formContainer/FormContainer";

const OrderDetail = () => {
  const {
    data: invoicesData,
    error,
    isLoading,
    refetch,
  } = useFetchInvoicesQuery();

  const [updateInvoiceAndOrder, { isLoading: isUpdating }] =
    useUpdateInvoiceAndOrderMutation();
  const invoices = invoicesData?.data || [];
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching orders:", error);
    return <div>Error: {error.message || "Something went wrong"}</div>;
  }

  const handleInvoice = async (order_id) => {
    try {
      navigate(`/profile/invoice/${order_id}`);
    } catch (error) {
      console.error("Error navigating to invoice:", error);
    }
  };

  const handlePay = async (order_id) => {
    try {
      await updateInvoiceAndOrder(order_id).unwrap();
      refetch();
    } catch (error) {
      console.error("Error updating invoice and order:", error);
    }
  };

  return (
    <FormContainer>
      <h1>Your Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.order.order_number}</td>
              <td>{formatCurrency(invoice.total)}</td>
              <td>{invoice.payment_status}</td>
              <td>
                {invoice.payment_status !== "paid" && (
                  <Button
                    variant="success"
                    onClick={() => handlePay(invoice.order._id)}
                    disabled={isUpdating}
                    style={{ marginRight: "10px" }}
                  >
                    {isUpdating ? "Updating..." : "Pay"}
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={() => handleInvoice(invoice.order._id)}
                >
                  Invoice
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </FormContainer>
  );
};

export default OrderDetail;
