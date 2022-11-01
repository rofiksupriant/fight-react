import { useState } from "react";
import { createUserAuthWithEmailAndPassword, createUserFromAuth } from "../../utils/firebase.utils";

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
        <div>
            <h1>Sign Up with Your Email and Password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input required type="text" name="displayName" value={displayName} onChange={handleChange} />

                <label>Email</label>
                <input required type="email" name="email" value={email} onChange={handleChange}/>
                
                <label>Password</label>
                <input required type="password" name="password" value={password} onChange={handleChange}/>
                
                <label>Confirm Password</label>
                <input required type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;