import { useContext } from 'react';

import { UserContextDataProps, UserContext } from '../contexts/UserContext';

export function useUser(): UserContextDataProps {
  const context = useContext(UserContext)

  return context;
}