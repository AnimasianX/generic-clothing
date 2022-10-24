//import { useEffect } from "react"; //used for redirect method but popup is much easier and manageable.
//import { getRedirectResult } from "firebase/auth";

import {
    //auth,
    signInWithGooglePopup,
    //signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     fetchData().catch(console.error);
    // }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Pop up</button>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default SignIn;