import { useEffect, useState } from "react";
import { useAuthInit } from "../queries/authQueries";
import { AuthDto, type UserType } from "@repo/types/dtos";
import { removeAuthToken, setAuthToken } from "../module/jwt";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const { data } = useAuthInit();

  useEffect(() => {
    const { authenticated, user } = AuthDto.parse(data);
    if (authenticated && user) {
      setUser({ ...user });
    }
  }, [data]);

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  const login = (user: UserType, token: string) => {
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
