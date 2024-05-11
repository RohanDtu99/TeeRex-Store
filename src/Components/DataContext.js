// DataContext.js
import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const myStorage = "listItems"
  const [cartProducts , setCartProducts] = useState(()=>{
    return JSON.parse(localStorage.getItem(myStorage))
  ||[]})

  return (
    <DataContext.Provider value={{ data, setData , cartProducts, setCartProducts , myStorage , cartItemCount, setCartItemCount}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
