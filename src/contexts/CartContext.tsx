import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface CartProps {
  title: string;
}

export interface CartContextDataProps {
  cart: CartProps;
  setCart: Dispatch<SetStateAction<CartProps>>;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
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
  const [cart, setCart] = useState<CartProps>(() => {
    const userInStorage = getDataInLocalStorage('cart');

    if (userInStorage) {
      return JSON.parse(userInStorage);
    }

    return {} as CartProps;
  });


  useEffect(() => {
    if (cart) {
      setDataInLocalStorage('cart', cart);
    }
  }, [cart])

  return (
    <UserContext.Provider value={{
      cart,
      showCart,
      setCart,
      setShowCart,
    }}>
      {children}
    </UserContext.Provider>
  )
}