import './sign-in-form.styles.scss'
import * as React from 'react'
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

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
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()

        try{
            const response = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            )

            console.log(response)
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
        <div className='sign-in-container'>
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
                
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}
 
export default SignInForm;