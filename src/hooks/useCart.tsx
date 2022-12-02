import { useContext } from 'react';

import { CartContextDataProps, UserContext } from '../contexts/CartContext';

export function useCart(): CartContextDataProps {
  const context = useContext(UserContext)

  return context;
}