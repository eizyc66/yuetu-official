import { createContext, useState, useContext } from 'react';


const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [detailMenu, setMenuArray] = useState([]);
  const value = {
    detailMenu,
    setMenuArray,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };