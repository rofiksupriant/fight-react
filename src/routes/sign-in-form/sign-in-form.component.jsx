import { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import {
    createUserFromAuth,
    signInUserAuthWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase.utils";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserFromAuth(user);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInUserAuthWithEmailAndPassword(email, password)
            console.log(response);
            
            resetFormField();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('no user asosiated with this email')
                    break;
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-in-container'>
            <h2>Don't have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Password"
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button type='submit' buttonType='inverted' >Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;