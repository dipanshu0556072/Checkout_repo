import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
   return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
   const [login, setLogin] = useState(false);

   const value = {
      login,
      setLogin,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
