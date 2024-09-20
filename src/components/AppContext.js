'use client';
import {SessionProvider} from "next-auth/react";
import {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  // Simplified to only return the base price since no size or extras exist.
  return cartProduct.price;
}

export function AppProvider({children}) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter((_, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product) {
    setCartProducts((prevProducts) => {
      const newProducts = [...prevProducts, product]; // No size or extras anymore
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
    toast.success('Product added to cart');
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeCartProduct,
        clearCart,
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
