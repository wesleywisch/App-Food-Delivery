import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  uid: string;
  admin?: boolean;
}

export interface UserContextDataProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext({} as UserContextDataProps);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
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

  const [user, setUser] = useState<User>(() => {
    const userInStorage = getDataInLocalStorage('user');

    if (userInStorage) {
      return JSON.parse(userInStorage);
    }

    return {} as User;
  });


  useEffect(() => {
    if (user.displayName) {
      setDataInLocalStorage('user', user);
    }
  }, [user])

  return (
    <UserContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}