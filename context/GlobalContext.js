"use client";
import { createContext, useContext, useState, useEffect } from "react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";

//create context
const GlobalContext = createContext();

//create Provider
export const GlobalContextProvider = ({ children }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((count) => {
        if (count) setUnreadMessageCount(count);
      });
    }
  }, [session, getUnreadMessageCount]);
  return (
    <GlobalContext.Provider
      value={{
        unreadMessageCount,
        setUnreadMessageCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//create a custom hook to access context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
