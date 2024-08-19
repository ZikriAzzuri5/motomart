import { useState, useEffect } from "react";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { useAddAddressMutation } from "../../../slices/addressesApiSlice";
import FormContainer from "../formContainer/FormContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const [addAddressMutation] = useAddAddressMutation();

  const [name, setName] = useState("");
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [ward, setWard] = useState("");
  const [detail, setDetail] = useState("");

  const [provinceName, setProvinceName] = useState("");
  const [regencyName, setRegencyName] = useState("");
  const [subdistrictName, setSubdistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json`
      )
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (province) {
      axios
        .get(
          `https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${province}.json`
        )
        .then((response) => setRegencies(response.data))
        .catch((error) => console.error("Error fetching regencies:", error));
    }
  }, [province]);

  useEffect(() => {
    if (regency) {
      axios
        .get(
          `https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${regency}.json`
        )
        .then((response) => setSubdistricts(response.data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [regency]);

  useEffect(() => {
    if (subdistrict) {
      axios
        .get(
          `https://kanglerian.github.io/api-wilayah-indonesia/api/villages/${subdistrict}.json`
        )
        .then((response) => setWards(response.data))
        .catch((error) => console.error("Error fetching villages:", error));
    }
  }, [subdistrict]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "detail") setDetail(value);
    if (name === "province") {
      const selectedProvince = provinces.find((p) => p.id === value);
      setProvince(value);
      setProvinceName(selectedProvince ? selectedProvince.name : "");
    }
    if (name === "regency") {
      const selectedRegency = regencies.find((r) => r.id === value);
      setRegency(value);
      setRegencyName(selectedRegency ? selectedRegency.name : "");
    }
    if (name === "subdistrict") {
      const selectedSubdistrict = subdistricts.find((s) => s.id === value);
      setSubdistrict(value);
      setSubdistrictName(selectedSubdistrict ? selectedSubdistrict.name : "");
    }
    if (name === "ward") {
      const selectedWard = wards.find((w) => w.id === value);
      setWard(value);
      setWardName(selectedWard ? selectedWard.name : "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressData = {
      name,
      detail,
      province: provinceName,
      regency: regencyName,
      subdistrict: subdistrictName,
      ward: wardName,
    };
    try {
      await addAddressMutation(addressData).unwrap();
      navigate("/profile");
      toast.success("Address added successfully");
      setName("");
      setProvince("");
      setRegency("");
      setSubdistrict("");
      setWard("");
      setDetail("");
    } catch (error) {
      toast.error("Error adding address");
    }
  };

  return (
    <FormContainer>
      <h3>Add New Address</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Detail Address</FormLabel>
              <FormControl
                type="text"
                name="detail"
                value={detail}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <FormGroup>
              <FormLabel>Province</FormLabel>
              <FormSelect
                name="province"
                value={province}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Regency</FormLabel>
              <FormSelect
                name="regency"
                value={regency}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Regency</option>
                {regencies.map((regency) => (
                  <option key={regency.id} value={regency.id}>
                    {regency.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <FormGroup>
              <FormLabel>District</FormLabel>
              <FormSelect
                name="subdistrict"
                value={subdistrict}
                onChange={handleInputChange}
                required
              >
                <option value="">Select District</option>
                {subdistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Village</FormLabel>
              <FormSelect
                name="ward"
                value={ward}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Village</option>
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddressForm;
