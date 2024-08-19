import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageClick(index + 1)}
        >
          {" "}
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
