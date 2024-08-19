import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import FormContainer from "../components/formContainer/FormContainer";
import ProductList from "../components/productList/productList";
import { useFetchProductsQuery } from "../../slices/productsApiSlice";
import Pagination from "../components/paginationComponent";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const { searchResult } = useOutletContext();

  const {
    data: Products = { products: [], total: 0 },
    isLoading,
    error,
  } = useFetchProductsQuery({ page, limit, ...searchResult.filters });

  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      const newProductsToDisplay = searchResult.slice(
        (page - 1) * limit,
        page * limit
      );

      if (
        JSON.stringify(newProductsToDisplay) !==
        JSON.stringify(productsToDisplay)
      ) {
        setProductsToDisplay(newProductsToDisplay);
      }

      if (totalItems !== searchResult.length) {
        setTotalItems(searchResult.length);
      }
    } else if (Products && Products.products.length > 0) {
      if (
        JSON.stringify(Products.products) !== JSON.stringify(productsToDisplay)
      ) {
        setProductsToDisplay(Products.products);
      }

      if (totalItems !== Products.total) {
        setTotalItems(Products.total);
      }
    }
  }, [searchResult, Products, page, limit, productsToDisplay, totalItems]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <FormContainer>
      <ProductList products={productsToDisplay} />
      <div className="my-4">
        {" "}
        <Pagination
          currentPage={page}
          totalItems={totalItems}
          itemsPerPage={limit}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </FormContainer>
  );
};

export default Dashboard;
