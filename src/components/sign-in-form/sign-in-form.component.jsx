import * as React from 'react'

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils'
import { 
    SignInContainer, 
    ButtonsContainer 
} from './sign-in-form.styles.jsx'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = React.useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()

        try{
            await signInAuthUserWithEmailAndPassword(
                email, 
                password
            )

            resetFormField()
        }catch(error){
            switch(error.code) {
                case 'auth/wrong-password' :
                    alert(`Invalid password`)
                    break
                case 'auth/user-not-found' :
                    alert(`User Email not found`)
                    break
                default :
                    console.log('User created encoutered an error', error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name] : value})
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    inputOptions = {{
                        type : 'email', 
                        required : true,
                        name : 'email', 
                        onChange : handleChange,
                        value : email,
                    }}
                />

                <FormInput 
                    label="Password"
                    inputOptions = {{
                        type : 'password', 
                        required : true,
                        name : 'password', 
                        onChange : handleChange,
                        value : password,
                    }}
                />
                
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}
 
export default SignInForm;