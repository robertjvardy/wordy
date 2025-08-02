import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextValue } from "../shared/types";
import { useAuthInit } from "../queries/authQueries";
import type { User } from "@repo/types/dtos";
import { removeAuthToken, setAuthToken } from "../module/jwt";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data } = useAuthInit({ enabled: !user });

  useEffect(() => {
    // TODO validate user response using zod
    if (data && data?.authenticated && data.user) {
      setUser({ ...data.user });
    }
  }, [data]);

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  const login = (user: User, token: string) => {
    setAuthToken(token);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated: !!user, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
