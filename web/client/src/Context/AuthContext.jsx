import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ROLES, ROLE_DASHBOARD } from "../constant/roles";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('crm_user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('crm_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('crm_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    //initialazation 
    setInitialized(true);
  }, []);

  //login user
   const loginUser = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const { token, ...authUser } = data;

      setUser(authUser);
      setToken(token);
      setIsAuthenticated(true);

      localStorage.setItem('crm_user', JSON.stringify(authUser));
      localStorage.setItem('crm_token', token);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // register user
  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          role: userData.role || 'admin',
        }),
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const { token, ...authUser } = data;

      setUser(authUser);
      setToken(token);
      setIsAuthenticated(true);

      localStorage.setItem('crm_user', JSON.stringify(authUser));
      localStorage.setItem('crm_token', token);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    
  };

  //logout user
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setLoading(false);
    setError(null);
    localStorage.removeItem('crm_user');
    localStorage.removeItem('crm_token');
  }, []);

  //update profile
  const updateProfile = (profileData) => {
    setUser((prev) => {
      const updated = { ...prev, ...profileData };
      localStorage.setItem('crm_user', JSON.stringify(updated));
      return updated;
    });
  };

  const clearError = () => setError(null);

    const isAdmin = useCallback(() => user?.role === ROLES.ADMIN, [user]);
  const isCustomer = useCallback(() => user?.role === ROLES.CUSTOMER, [user]);
  const isEmployee = useCallback(() => user?.role === ROLES.EMPLOYEE, [user]);

  const getDashboardPath = useCallback(() => {
    if (!user) return '/login';
    return ROLE_DASHBOARD[user.role] || '/login';
  }, [user]);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    initialized,
    loginUser,
    registerUser,
    logout,
    updateProfile,
    clearError,
    isAdmin,
    isCustomer,
    isEmployee,
    getDashboardPath,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
