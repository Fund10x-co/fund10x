import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));
    if (storedUser) {
      setUser(JSON.parse(storedUser.split("=")[1]));
    }
  }, []);

  const login = (userData: User) => {
    document.cookie = `user=${JSON.stringify(userData)};max-age=${
      30 * 24 * 60 * 60
    };path=/`;
    setUser(userData);
  };

  const logout = () => {
    document.cookie = "user=;max-age=0;path=/";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
