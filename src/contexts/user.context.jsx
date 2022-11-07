import { createContext, useState, useEffect, useReducer} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) =>{
  const { type, payload } = action;

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return{
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }

}

const INITIAL_STATE = {
  currentUser : null,
}

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer,INITIAL_STATE);
  

  const { currentUser } = state;
  console.log(currentUser);

  const setCurrentUser = (user) =>{
    dispatch( createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }

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



// const userReducer = (state, action) =>{
//   return{
//     currentUser: 
//   }
// }