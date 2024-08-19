import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./app/components/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function App() {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <>
      <Navigation setSearchResult={setSearchResult} />
      <ToastContainer />
      <Container>
        <Outlet context={{ searchResult }} />
      </Container>
    </>
  );
}
