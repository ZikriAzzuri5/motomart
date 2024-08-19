import React, { useState } from "react";
import FormContainer from "../components/formContainer/FormContainer";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import { useFetchAddressesQuery } from "../../slices/addressesApiSlice";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { data } = useFetchAddressesQuery();
  const addresses = data?.data || [];
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const selectAddressHandler = (addressId) => {
    setSelectedAddress(addressId);
  };

  const proceedToCheckout = () => {
    if (selectedAddress) {
      navigate(`/checkout?address=${selectedAddress}`);
    }
  };

  return (
    <FormContainer>
      <h1>Address</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Detail</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => (
            <tr key={address._id}>
              <td>{index + 1}</td>
              <td>{address.name}</td>
              <td>{address.detail}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  name="addressSelect"
                  id={`address-${address._id}`}
                  onChange={() => selectAddressHandler(address._id)}
                  checked={selectedAddress === address._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={proceedToCheckout} disabled={!selectedAddress}>
        Checkout
      </Button>
    </FormContainer>
  );
};

export default Address;
