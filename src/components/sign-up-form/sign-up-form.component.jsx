import * as React from 'react'
import { useDispatch } from 'react-redux'

import { signUpStart } from '../../store/user/user.action'
import { SignUpContainer } from  './sign-up-form.styles.jsx'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'


const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
}

const SignUpForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = React.useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()

        if(password !== confirmPassword){
            alert("password do not match")
            return
        }

        try{
            dispatch(
                signUpStart(
                    email, 
                    password, 
                    displayName
                )
            )
            
            resetFormField()
        }catch(error){
            if(error.code  === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else{
                console.log('User created encoutered an error', error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name] : value})
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    inputOptions = {{
                        type : 'text', 
                        required : true,
                        name : 'displayName', 
                        onChange : handleChange,
                        value : displayName,
                    }}
                />

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

                <FormInput 
                    label="Confirm Password"
                    inputOptions = {{
                        type : 'password', 
                        required : true,
                        name : 'confirmPassword', 
                        onChange : handleChange,
                        value : confirmPassword,
                    }}
                />
                
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}
 
export default SignUpForm;