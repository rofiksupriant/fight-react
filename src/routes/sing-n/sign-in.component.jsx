import {signInWithGooglePopup} from '../../utils/firebase.utils.js'

const SignIn = () => {
    const logWithGooglePopup = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
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