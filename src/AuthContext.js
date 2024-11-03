import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("userPhoneNumber");
  }, []);

  // const refreshAccessToken = useCallback(async () => {
  //   try {
  //     const refreshToken = localStorage.getItem("refresh_token");
  //     if (!refreshToken) return logout();

  //     const response = await axios.post("http://127.0.0.1:8000/graphql/", {
  //       query: `mutation {
  //         refreshToken(refreshToken: "${refreshToken}") {
  //           token
  //         }
  //       }`,
  //     });

  //     const newAccessToken = response.data.data.refreshToken.token;
  //     localStorage.setItem("access_token", newAccessToken);
  //   } catch (error) {
  //     console.error("Failed to refresh token:", error);
  //     logout();
  //   }
  // }, [logout]);

  // const scheduleTokenCheck = useCallback(() => {
  //   const accessToken = localStorage.getItem("access_token");
  //   if (!accessToken) return;

  //   const expiry = jwtDecode(accessToken).exp;
  //   const now = Date.now() / 1000;

  //   if (expiry - now < 60) {
  //     refreshAccessToken();
  //   } else {
  //     setTimeout(scheduleTokenCheck, (expiry - now - 60) * 1000);
  //   }
  // }, [refreshAccessToken]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("access_token", JSON.stringify(userData.token));
    localStorage.setItem("first_name", JSON.stringify(userData.firstName));
    localStorage.setItem("last_name", JSON.stringify(userData.lastName));
    // scheduleTokenCheck();
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");
    if (loggedInUser && accessToken) {
      setIsAuthenticated(true);
      setUser(JSON.parse(loggedInUser));
      // scheduleTokenCheck(); // Start the token check on initial load if user is logged in
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
