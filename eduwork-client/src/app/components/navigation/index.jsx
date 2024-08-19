import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  NavDropdown,
  FormSelect,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/authSlice";
import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFetchProductsQuery,
  useFetchCategoriesQuery,
  useFetchTagsQuery,
} from "../../../slices/productsApiSlice";
import { useState, useEffect, useCallback } from "react";

export default function Navigation({ setSearchResult }) {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ q: "", category: "", tags: [] });
  const { data: categories = [] } = useFetchCategoriesQuery();
  const { data: tags = [] } = useFetchTagsQuery();
  const {
    data: productsData = { products: [], total: 0 },
    isLoading,
    error,
  } = useFetchProductsQuery({ ...filters });

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((e) => {
      setFilters((prevFilters) => ({ ...prevFilters, q: e.target.value }));
    }, 300),
    []
  );

  useEffect(() => {
    if (!isLoading && !error) {
      setSearchResult(productsData.products);
    }
  }, [productsData, isLoading, error, setSearchResult]);

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilters({ ...filters, tags: selectedTags });
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-between"
          >
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Navbar.Brand>MotoMart</Navbar.Brand>
              </LinkContainer>
            </Nav>
            {location.pathname === "/" && (
              <Form className="d-flex justify-content-center align-items-center">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={handleSearch}
                />
                <FormSelect
                  aria-label="Select Category"
                  className="me-2"
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </FormSelect>
                <FormSelect
                  aria-label="Select Tags"
                  className="me-2"
                  onChange={handleTagChange}
                >
                  <option value="">Select Tags</option>
                  {tags.map((tag) => (
                    <option key={tag._id} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
                </FormSelect>
              </Form>
            )}

            <Nav className="ms-auto d-flex align-items-center">
              {userInfo ? (
                <NavDropdown title={userInfo.user.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart (
                  {cartItems.length})
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
