import React,{useState, useContext, createContext,  ReactNode} from "react";

interface Product{
    name: string;
    image:string;
    price: number;
    quantity?:number;
}

interface CartTextProps{
    cart:Product[];
    addToCart:(product: Product)=>void;
    removeFromCart:(product: Product)=>void;
    getTotalPrice: () => number;
}

interface CartProviderProps {
    children: ReactNode;
  }

export const Cart = createContext<CartTextProps| undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => 
{    const [cart,setCart]= useState<Product[]>([]);

    const addToCart= (product:Product) =>{
        setCart((prevCart)=> {
            const existingP= prevCart.find((item)=> item.name === product.name);
            if (existingP){
                return prevCart.map((item)=> 
                item.name ===   product.name?{...item, quantity: (item.quantity||0)+1}:item);

            }else{
                return [...prevCart,{...product,quantity:1}]
            }
        });
    };
    const removeFromCart = (product: Product) => {
        setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.name === product.name);
          if (existingProduct?.quantity === 1) {
            return prevCart.filter((item) => item.name !== product.name);
          } else {
            return prevCart.map((item) =>
              item.name === product.name ? { ...item, quantity: (item.quantity || 0) - 1 } : item
            );
          }
        });
      };
    
      const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * (item.quantity || 0), 0);
      };
      return (
        <Cart.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
          {children}
        </Cart.Provider>
      );
    };   
    export const useCart = () => {
        const context = useContext(Cart);
        if (context === undefined) {
          throw new Error('useCart must be used within a CartProvider');
        }
        return context;
    }
    
   


