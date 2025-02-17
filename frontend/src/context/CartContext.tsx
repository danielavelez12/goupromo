import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  item_number: string;
  name: string;
  offer_price: number;
  quantity: number;
  restaurant_name: string;
  image_url: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (itemNumber: string, quantity: number) => void;
  removeItem: (itemNumber: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load initial state from sessionStorage
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to sessionStorage whenever items change
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(items));
    console.log("items in session", items);
  }, [items]);

  const addItem = (item: CartItem) => {
    console.log("adding item", item);
    setItems((current) => {
      const existingItem = current.find(
        (i) => i.item_number === item.item_number
      );
      if (existingItem) {
        return current.map((i) =>
          i.item_number === item.item_number
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...current, item];
    });
  };

  const updateQuantity = (itemNumber: string, quantity: number) => {
    console.log("updating quantity, ", itemNumber, quantity);
    console.log({ items });
    setItems((current) =>
      quantity === 0
        ? current.filter((item) => item.item_number !== itemNumber)
        : current.map((item) =>
            item.item_number === itemNumber ? { ...item, quantity } : item
          )
    );
  };

  const removeItem = (itemNumber: string) => {
    setItems((current) =>
      current.filter((item) => item.item_number !== itemNumber)
    );
  };

  const clearCart = () => {
    setItems([]);
    sessionStorage.removeItem("cart");
  };

  const total = items.reduce(
    (sum, item) => sum + item.offer_price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
