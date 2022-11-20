import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import {  
    googleSignInStart,
    emailSignInStart
} from '../../store/user/user.action'
import { 
    SignInContainer, 
    ButtonsContainer 
} from './sign-in-form.styles'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'


const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async() => {
        dispatch(googleSignInStart())
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        try{
            dispatch(emailSignInStart(email, password))
            resetFormField()
        }catch(error){
            alert(`User sign in failed`)
            console.log('User created encoutered an error', error)
        }
    }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
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
                    <Button 
                        type="button" 
                        buttonType={BUTTON_TYPE_CLASSES.google} 
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}
 
export default SignInForm;