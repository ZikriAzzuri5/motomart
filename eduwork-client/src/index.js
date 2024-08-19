import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./app/pages/Dashboard";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import Profile from "./app/pages/Profile";
import Cart from "./app/pages/Cart";
import Address from "./app/pages/Address";
import Invoice from "./app/pages/Invoice";

import Private from "./app/components/private";
import AddressComponent from "../src/app/components/addressComponent";
import AddressForm from "./app/components/addressForm";
import Checkout from "./app/components/checkout";
import OrderList from "./app/components/orderList";
// import OrderDetail from "./app/components/orderDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/address" element={<Address />} />
      {/* <Route path="/orders" element={<OrderDetail />} /> */}

      <Route path="/orders" element={<OrderList />} />
      <Route path="/profile" element={<Private />}>
        <Route index element={<Profile />} />
        <Route path="invoice/:order_id" element={<Invoice />} />
        <Route path="address" element={<AddressComponent />} />
        <Route path="address/new" element={<AddressForm />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
