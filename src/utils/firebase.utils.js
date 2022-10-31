import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy1PewSOC2Qbty2Td8_DsElQUtMsBArU8",
  authDomain: "crown-clothing-52234.firebaseapp.com",
  projectId: "crown-clothing-52234",
  storageBucket: "crown-clothing-52234.appspot.com",
  messagingSenderId: "739245244579",
  appId: "1:739245244579:web:b9faab14ac9c13a1897f16"
};

const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

const db = getFirestore();

export const createUserFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
     setDoc(userDocRef, {
      email: email,
      displayName: displayName,
      createdAt: new Date()
    })
  }

  return userDocRef
}