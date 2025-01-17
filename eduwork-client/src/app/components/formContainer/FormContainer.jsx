import { Container, Col, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col className="card p-5">{children}</Col>
      </Row>
    </Container>
  );
};
export default FormContainer;
