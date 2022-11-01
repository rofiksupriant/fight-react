import {signInWithGooglePopup, createUserFromAuth} from '../../utils/firebase.utils.js'
import SignUpForm from '../sign-up-form/sign-up-form.component.jsx';

const SignIn = () => {
    const logWithGooglePopup = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserFromAuth(user);
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logWithGooglePopup}>
                Sign in with Google
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;