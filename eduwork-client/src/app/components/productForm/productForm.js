import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  getProductDetails,
} from "../../api/features/Product/productActions";

const ProductForm = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productList);
  const { loading, error, products } = productDetails;

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCountInStock(product.countInStock);
      } else {
        dispatch(getProductDetails(productId));
      }
    }
  }, [dispatch, productId, products]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (productId) {
      dispatch(
        updateProduct(productId, { name, price, description, countInStock })
      );
    } else {
      dispatch(createProduct({ name, price, description, countInStock }));
    }
    history.push("/");
  };

  return (
    <div>
      <h1>{productId ? "Edit Product" : "Create Product"}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Count in Stock"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
        />
        <button type="submit">{productId ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
