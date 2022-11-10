import { useState } from "react";
import { createUserAuthWithEmailAndPassword, createUserFromAuth } from "../../utils/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../../components/button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("password do not match.")
        }

        try {
            const { user } = await createUserAuthWithEmailAndPassword(email, password)
            createUserFromAuth(user, { displayName })
            
            resetFormField();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Can not create user, email already in use')
                return
            }
            console.log('user creation failed', error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    required type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                />
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
                <FormInput
                    label="Confirm Password"
                    required type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <Button children="Sign Up" buttonType='google' type="submit"/>
            </form>
        </div>
    )
}

export default SignUpForm;