import React, { useState, useContext } from 'react';
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [password, setPassword] = useState('');
  const [cartCount, setCartCount] = useState('0');
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [name, setName] = useState('Name');
  const [cartData, setCartData] = useState([]);

  return (
    <AppContext.Provider
      value={{
        password,
        setPassword,
        cartCount,
        setCartCount,
        sidebarWidth,
        setSidebarWidth,
        name,
        setName,
        cartData,
        setCartData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
