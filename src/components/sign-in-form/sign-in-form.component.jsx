import {
    //auth,
    signInWithGooglePopup,
    //signInWithGoogleRedirect,
    signInUserWithAuthEmailAndPassword
} from "../../utils/firebase/firebase.utils"
import { useState, } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import "./sign-in-form.styles.scss";


const defaultSignInForm = {
    email: '',
    password: '',
}

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
    const [signInForm, setSignInForm] = useState(defaultSignInForm);
    const { email, password } = signInForm;


    const resetFormFields = () => {
        setSignInForm(defaultSignInForm);
    }

    const signInUsingEmailAndPassword = async (event) => {
        event.preventDefault();
        try {
            await signInUserWithAuthEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('user not associated with this email');
                    break;
                default:
                    console.log(error);
            }

        }
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup();

    }
    console.log(signInForm);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignInForm({ ...signInForm, [name]: value });
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={signInUsingEmailAndPassword}>
                <FormInput label={'E-mail'} required type="email" onChange={handleChange} name="email" value={email} />
                <FormInput label={'Password'} required type="password" onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>


        </div>
    )
}

export default SignIn;