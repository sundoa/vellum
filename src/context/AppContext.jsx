import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("vellumUser"));
    const storedFolders = JSON.parse(localStorage.getItem("vellumFolders")) || [];

    if (storedUser) setUser(storedUser);
    setFolders(storedFolders);
  }, []);

  useEffect(() => {
    localStorage.setItem("vellumFolders", JSON.stringify(folders));
  }, [folders]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        folders,
        setFolders,
        activeFolder,
        setActiveFolder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

