import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

import { ProductContext } from "./context/ProductContext";
import { CartContext } from "./context/CartContext";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // add the given item to the cart
    // Added the if statement to prevent duplicate IDs to aid in removal
    if (cart.includes(item) === false) {
      setCart([...cart, item]);
    }
  };

  const removeItem = (item) => {
    // Remove the given item from the cart
    console.log("remove item");
    setCart([
      ...cart,
      [cart.splice(0, item.id), cart.splice(1)],
      // [cart.splice(0, item.id).concat(cart.splice(-1))],
      // cart: {[...cart.splice(0, item.id), cart.splice(1)]}
      // [cart.splice(0, item.id), cart.splice(1)],
      // cart: [...cart.splice(0, item.id), ...cart.splice(1)]
      // delete cart[item.id],
      // cart.filter(function (value, index, arr) {
      //   return value !== item.id;
      // }),
    ]);
    console.log(cart);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
