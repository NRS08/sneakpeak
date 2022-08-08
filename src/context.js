import React, { useState, useContext } from 'react';
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [shoeData, setShoeData] = useState();
  const [password, setPassword] = useState('');
  const [cartCount, setCartCount] = useState('0');
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [name, setName] = useState('Name');

  return (
    <AppContext.Provider
      value={{
        shoeData,
        setShoeData,
        password,
        setPassword,
        cartCount,
        setCartCount,
        sidebarWidth,
        setSidebarWidth,
        name,
        setName,
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
