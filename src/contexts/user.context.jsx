import { createContext, useState, useEffect} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(()=>{
      const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user){
         createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
    })//permanantly open listener on auth. listens to see if a user signs in/out and other
    //actions pertaining to authorization like using it to modify user information etc...j
    //this makes it more centralized as opposed to when we would setCurrentUser in signIN and signUp components.
    //it makes sense to do this because we would be repeating code all over the place where we would need a current user
    //and it could cause performance issues since we are running the code over and over again based on state change.
    return unsubscribe;
  },[])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};