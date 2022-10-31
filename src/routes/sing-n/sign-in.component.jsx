import {signInWithGooglePopup, createUserFromAuth} from '../../utils/firebase.utils.js'

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
        </div>
    )
}

export default SignIn;