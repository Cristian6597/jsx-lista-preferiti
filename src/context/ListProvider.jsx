// fare in modo di creare sotto cartelle e di mettere le nuove aggiunte in base a dove vuole l'utente
import { createContext, useState } from 'react';

// Crea i contesti per il tipo e il nome
export const TypeContext = createContext();
export const NameContext = createContext();
export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  
  // Stato per il tipo ( destinazione cartella )
  const [selectedType, setSelectedType] = useState('lavoro');
  const changeType = (type) => {
    setSelectedType(type);
  };

  // Stato per il nome
 /*  const [name, setName] = useState('');
  const updateName = (newName) => {
    setName(newName);
  }; */

  return (
    <ListContext.Provider value={{ selectedType, changeType }}>
      <NameContext.Provider value={{ /* name, updateName */ }}>
        {children}
      </NameContext.Provider>
    </ListContext.Provider>
  );
};