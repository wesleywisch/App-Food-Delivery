import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface UserContextDataProps {
  user: {};
  setUser: Dispatch<SetStateAction<{}>>;
}

export const UserContext = createContext({} as UserContextDataProps);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}