import * as React from 'react'
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../sign-up/sign-up-form.component'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In with google popup</button>
            <SignUpForm/>
        </>
    );
}
 
export default SignIn;