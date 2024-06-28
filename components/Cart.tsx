import React, { useState, useEffect } from 'react';
import { createContext, useContext, ReactNode } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
  quantity?: number;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  getTotalPrice: () => number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.name === product.name? {...item, quantity: (item.quantity || 0) + 1 } : item
        );
      } else {
        return [...prevCart, {...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct?.quantity === 1) {
        return prevCart.filter((item) => item.name!== product.name);
      } else {
        return prevCart.map((item) =>
          item.name === product.name? {...item, quantity: (item.quantity || 0) - 1 } : item
        );
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 0), 0);
  };

  useEffect(() => {
    console.log(cart); //  current state
  }, [cart]); 

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
