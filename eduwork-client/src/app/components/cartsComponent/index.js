// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useLazyFetchCartQuery,
//   useUpdateCartsMutation,
// } from "../../../slices/cartsApiSlice";
// import { clearCart, setCartItems } from "../../../slices/cartSlice";

// const CartComponent = () => {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.cart);
//   const [fetchCart, { data: cartData, isLoading }] = useLazyFetchCartQuery();
//   const [updateCarts] = useUpdateCartsMutation();

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   useEffect(() => {
//     if (cartData) {
//       dispatch(clearCart());
//       dispatch(setCartItems(cartData));
//     }
//   }, [cartData, dispatch]);

//   const handleUpdateCart = (item) => {
//     updateCarts(item);
//   };
//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         cartItems.map((item) => (
//           <div key={item._id}>
//             <h2>{item.name}</h2>
//             <p>Price: ${item.price}</p>
//             <p>Quantity: {item.qty}</p>
//             <button onClick={() => handleUpdateCart(item)}>Update</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CartComponent;
