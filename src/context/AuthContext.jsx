// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('eseva_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('eseva_auth_token') || null;
  });

  const [loading, setLoading] = useState(false);

  // Real-time Session Terminated Notification state
  const [sessionTerminatedInfo, setSessionTerminatedInfo] = useState({
    isOpen: false,
    message: ''
  });

  // Handle immediate real-time termination triggered from another device
  const handleSessionTerminated = useCallback((eventData) => {
    const reasonMsg =
      eventData?.reason ||
      'Your session has been terminated because another session was started on a different device.';
    
    // Clear user state immediately
    setUser(null);
    setToken(null);
    localStorage.removeItem('eseva_user');
    localStorage.removeItem('eseva_auth_token');
    localStorage.removeItem('eseva_session_id');

    // Trigger user notification dialog
    setSessionTerminatedInfo({
      isOpen: true,
      message: reasonMsg
    });
  }, []);

  const closeTerminatedModal = () => {
    setSessionTerminatedInfo({ isOpen: false, message: '' });
  };

  // Real-time SSE and BroadcastChannel listener for active session
  useEffect(() => {
    if (!token) return;

    // Fetch latest user profile if missing
    if (!user) {
      api.getProfile().then((data) => {
        if (data && data.user) {
          setUser(data.user);
          localStorage.setItem('eseva_user', JSON.stringify(data.user));
        }
      });
    }

    // Subscribe to SSE stream and cross-tab/cross-device signals
    const unsubscribe = api.subscribeSessionStream(token, (eventData) => {
      handleSessionTerminated(eventData);
    });

    // Periodic heartbeat verification (every 25 seconds)
    const interval = setInterval(async () => {
      if (document.visibilityState === 'visible') {
        const check = await api.checkSession();
        if (check && check.terminated) {
          handleSessionTerminated({ reason: check.message });
        }
      }
    }, 25000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [token, handleSessionTerminated]);

  const login = async (email, password, forceTerminate = false) => {
    setLoading(true);
    try {
      const res = await api.login(email, password, forceTerminate);
      
      // If 409 conflict returned, pass back to caller without modifying auth state
      if (res && res.sessionConflict) {
        setLoading(false);
        return res;
      }

      if (res && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('eseva_user', JSON.stringify(res.user));
        localStorage.setItem('eseva_auth_token', res.token);
        if (res.sessionId) {
          localStorage.setItem('eseva_session_id', res.sessionId);
        }
        // Reset any prior termination notice
        setSessionTerminatedInfo({ isOpen: false, message: '' });
      }
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.register(userData);
      if (res && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('eseva_user', JSON.stringify(res.user));
        localStorage.setItem('eseva_auth_token', res.token);
        if (res.sessionId) {
          localStorage.setItem('eseva_session_id', res.sessionId);
        }
        setSessionTerminatedInfo({ isOpen: false, message: '' });
      }
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // ignore
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('eseva_user');
    localStorage.removeItem('eseva_auth_token');
    localStorage.removeItem('eseva_session_id');
    window.location.hash = '#home';
  };

  const isAdmin = user && user.role === 'admin';
  const isCustomer = user && user.role === 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        isCustomer,
        loading,
        login,
        register,
        logout,
        sessionTerminatedInfo,
        closeTerminatedModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
