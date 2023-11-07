import { createContext, useState } from "react";

export const ShoppingCartContext = createContext({});

export function ShoppingCartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    cartItens: [],
    totalPrice: 0,
  });
  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
