import React, { useState, useEffect } from 'react';
import { createContext, useContext, ReactNode } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
  amount?: number;
  branch_product_id: number;
  branch_id: number;
  offer_id:number;
  voucher: string;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.branch_product_id === product.branch_product_id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.branch_product_id === product.branch_product_id
            ? { ...item, amount: (item.amount || 0) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, amount: 1 }];
      }
    });
    console.log("cart", cart);
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct?.amount === 1) {
        return prevCart.filter((item) => item.name!== product.name);
      } else {
        return prevCart.map((item) =>
          item.name === product.name? {...item, amount: (item.amount || 0) - 1 } : item
        );
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * (item.amount || 0), 0);
  };
  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    console.log(cart); //  current state
  }, [cart]); 

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, clearCart }}>
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
