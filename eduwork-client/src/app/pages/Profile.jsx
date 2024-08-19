import { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import FormContainer from "../components/formContainer/FormContainer";
import "./index.css";

import AddressComponent from "../components/addressComponent";
import ProfileComponent from "../components/profileComponent";
import OrderDetail from "../components/orderDetail";

const Profile = () => {
  const [activeKey, setActiveKey] = useState("profile");

  return (
    <FormContainer>
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="ordering">Ordering</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="address">Address</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="profile">
            <ProfileComponent />
          </Tab.Pane>
          <Tab.Pane eventKey="ordering">
            <OrderDetail />
          </Tab.Pane>
          <Tab.Pane eventKey="address">
            <AddressComponent />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </FormContainer>
  );
};

export default Profile;
