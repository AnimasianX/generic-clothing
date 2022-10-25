//import { useEffect } from "react"; //used for redirect method but popup is much easier and manageable.
//import { getRedirectResult } from "firebase/auth";


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in-form.component";
import "./login.styles.scss";


const LogIn = () => {


    return (
        <div className="authentication-container">
            <SignIn></SignIn>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default LogIn;