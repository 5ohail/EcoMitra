import React, { createContext, useEffect, useState } from "react";

export const context = createContext(null);

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userEmail") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("userName") || ""
  );
  
  useEffect(() => {
    console.log("Context Updated:", { isLoggedIn, user });
  }, [isLoggedIn, user]);

  return (
    <context.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
