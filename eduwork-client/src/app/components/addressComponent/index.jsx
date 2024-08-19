import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useFetchAddressesQuery,
  useDeleteAddressMutation,
} from "../../../slices/addressesApiSlice";
import { Link } from "react-router-dom";

const Address = () => {
  const { data, error, isLoading, refetch } = useFetchAddressesQuery();
  const [deleteAddressMutation] = useDeleteAddressMutation();

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddressMutation(id).unwrap();
      toast.success("Address deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Error deleting address");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  const addresses = data?.data || [];

  return (
    <div>
      <h2>Addresses</h2>
      <Link to="address/new">
        <Button variant="primary" className="mb-3">
          Add New Address
        </Button>
      </Link>
      {addresses.length === 0 ? (
        <p>No addresses found</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr key={address._id}>
                <td>{index + 1}</td>
                <td>{address.name}</td>
                <td>{address.detail}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAddress(address._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Address;
