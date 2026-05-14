import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  totalItems: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  decreaseQuantity: () => {},
  totalItems: 0,
  grandTotal: 0,
});

const CART_STORAGE_KEY = "@ecommerce_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(CART_STORAGE_KEY)
      .then((data) => { if (data) setCartItems(JSON.parse(data)); })
      .catch(() => {});
  }, []);

  const saveCart = (items: CartItem[]) => {
    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const updated = existing
        ? prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }];
      saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((i) => i.id !== productId);
      saveCart(updated);
      return updated;
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      const updated = existing && existing.quantity > 1
        ? prev.map((i) => i.id === productId ? { ...i, quantity: i.quantity - 1 } : i)
        : prev.filter((i) => i.id !== productId);
      saveCart(updated);
      return updated;
    });
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const grandTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity, totalItems, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}