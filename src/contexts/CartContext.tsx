import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface CartProps {
  id: string;
  name: string;
  desc: string;
  price: string;
  imgSrc: string;
  category: string;
  calories: string;
  amount: number;
}

export interface CartContextDataProps {
  cartItems: CartProps[];
  setCartItems: Dispatch<SetStateAction<CartProps[]>>;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  handleAddItemInCart: (item: CartProps) => null | string;
  handleDeleteItemInCart: (item: CartProps) => null | string;
}

export const UserContext = createContext({} as CartContextDataProps);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  function setDataInLocalStorage(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  function getDataInLocalStorage(name: string) {
    const storage = localStorage.getItem(name);

    if (storage) {
      return storage;
    }

    return null
  }

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartProps[]>(() => {
    const cartInStorage = getDataInLocalStorage('cart');

    if (cartInStorage && cartInStorage?.length > 1) {
      return JSON.parse(cartInStorage);
    }

    return [] as CartProps[];
  });

  useEffect(() => {
    if (cartItems.length > 1) {
      setDataInLocalStorage('cart', cartItems);
    }
  }, [cartItems]);

  function handleAddItemInCart(item: CartProps) {
    if (item) {
      setCartItems([...cartItems, item]);
      return 'Item adicionado com sucesso!';
    }

    return 'Não foi possível adicionar o item';
  }

  function handleDeleteItemInCart(item: CartProps) {
    const filteredCart = cartItems.filter(cartItem => cartItem.id !== item.id);

    if (filteredCart) {
      setCartItems(filteredCart);
      return 'Item deletado';
    }

    return 'Não foi possível deletar o item';
  }

  return (
    <UserContext.Provider value={{
      cartItems,
      showCart,
      setCartItems,
      setShowCart,
      handleAddItemInCart,
      handleDeleteItemInCart,
    }}>
      {children}
    </UserContext.Provider>
  )
}