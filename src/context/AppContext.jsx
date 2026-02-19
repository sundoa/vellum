import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Listen to folders for this user
        const foldersRef = collection(db, "users", firebaseUser.uid, "folders");
        return onSnapshot(foldersRef, (snapshot) => {
          const folderData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFolders(folderData);
        });
      } else {
        setUser(null);
        setFolders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, folders, setFolders, activeFolder, setActiveFolder }}>
      {children}
    </AppContext.Provider>
  );
}
