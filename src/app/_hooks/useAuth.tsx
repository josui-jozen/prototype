"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  avatar: string | null;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const mockUser: User = {
  id: "user1",
  name: "saigo_don",
  avatar: null,
};

const AuthContext = createContext<AuthContextType>({
  user: mockUser,
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({
  children,
  defaultAuthenticated = true,
}: {
  children: ReactNode;
  defaultAuthenticated?: boolean;
}) {
  const [user, setUser] = useState<User | null>(
    defaultAuthenticated ? mockUser : null
  );

  const login = () => setUser(mockUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
