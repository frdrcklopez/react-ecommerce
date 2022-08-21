import './sign-up-form.styles.scss'
import * as React from 'react'
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'

const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = React.useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const handleSubmit = async (event) =>{
        event.preventDefault()

        if(password !== confirmPassword){
            alert("password do not match")
            return
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            )

            await createUserDocumentFromAuth(user, { displayName })
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
        <div>
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
        </div>
    );
}
 
export default SignUpForm;