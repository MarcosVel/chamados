import { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  // const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ signed: !!user, user }}>
      {/* !! transforma para boolean */}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;