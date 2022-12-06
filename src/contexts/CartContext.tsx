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
  handleUpdateQuantity: (item: CartProps, action: 'add' | 'remove') => null | string;
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
    if (cartItems.length > -1) {
      setDataInLocalStorage('cart', cartItems);
    }
  }, [cartItems]);

  function handleAddItemInCart(item: CartProps) {
    if (item) {
      item.amount = 1;

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

  function handleUpdateQuantity(item: CartProps, action: 'add' | 'remove') {
    if (action === 'add') {
      const updatedCart = [...cartItems];
      const productExists = updatedCart.find(product => product.id === item.id);

      if (productExists) {
        productExists.amount += 1;
        setCartItems(updatedCart);
      } else {
        throw Error();
      }
    }

    if (action === 'remove') {
      const product = cartItems.find(i => i.id === item.id);

      if (product?.amount === 0) {
        return null;
      }

      if (product) {
        const updatedCart = [...cartItems];
        const productExists = updatedCart.find(product => product.id === item.id);

        if (productExists) {
          productExists.amount -= 1;
          setCartItems(updatedCart);
        } else {
          throw Error();
        }
        return 'Quantidade alterada com sucesso';
      }
    }

    return null;
  }

  return (
    <UserContext.Provider value={{
      cartItems,
      showCart,
      setCartItems,
      setShowCart,
      handleAddItemInCart,
      handleDeleteItemInCart,
      handleUpdateQuantity
    }}>
      {children}
    </UserContext.Provider>
  )
}