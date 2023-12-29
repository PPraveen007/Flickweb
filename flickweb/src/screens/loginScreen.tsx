import PrimaryButton from "./components/primaryButton";
import logo from '../screens/assets/popLogo.png'
import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../screens/features/userSlice";
import { useHistory } from "react-router";

export default function LoginScreen() {

    const [signUpClass, setSignUpClass] = useState<any>('back');
    const [signInClass, setSignInClass] = useState<any>('front');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginErrors, setLoginErrors] = useState<string>('');

    const dispatch = useDispatch();
    const auth = getAuth();
    const history = useHistory();

    const switchMode = (currentMode: any) => {
        if (currentMode === "Sign Up") { setSignInClass('front'); setSignUpClass('back'); }
        else { setSignUpClass('front'); setSignInClass('back'); }
        setEmail('');
        setPassword('');
    }

    const createAccount = () => {
        const time = Date.now();
        const data = {
            email: email,
            userPic: `https://avatars.dicebear.com/api/identicon/:${email.split("@")[0] + time}.svg`,
            userName: email.split("@")[0],
            userId: `${email.split("@")[0]}.${time}`
        }
        if (email === '' || password === '') { alert("Please fill all the fields") }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setLoginErrors('')
                    setEmail('')
                    setPassword('')
                    switchMode("Sign Up")
                    projectFirestore.collection('users').doc(`${email}`).set(data)
                })
                .catch((error) => setLoginErrors(error.message));
        }
    }

    const loginAccount = () => {
        if (email === '' || password === '') { alert("Please fill all fields") }
        else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    dispatch(setActiveUser({ userEmail: email, loggedIn: true, }))
                    history.push({ pathname: '/profile' });
                })
                .catch((error) => setLoginErrors(error.message));
        }
    }



    return (
        <div className="base-flex sign-screen">
            <div className={`base-flex signin-card ${signInClass}`}>
                <div>
                    <img src={logo} alt="Ethrex popcorn bucket Logo  for signUP or Login card." />
                    <h2>Sign In</h2>
                </div>
                <form action="" method="post">
                    <div>
                        <label htmlFor="fname">Your Email</label>
                        <input type="email" onInputCapture={(e: any) => setEmail(e.target.value)} placeholder="someone@gmail.com" id="fname" name="fname" />
                        <label htmlFor="lname">Your Password</label>
                        <input type="password" onInputCapture={(e: any) => setPassword(e.target.value)} placeholder="Your Password" id="lname" name="lname" />
                        {loginErrors}
                        <PrimaryButton onClick={loginAccount} title={"Sign In"} />
                    </div>
                </form>
                <span>Need an Account? <a onClick={() => switchMode("Sign In")}>Sign Up</a></span>
            </div>

            <div className={`base-flex signup-card ${signUpClass}`}>
                <div>
                    <img src={logo} alt="Ethrex popcorn bucket Logo  for signUP or Login card." />
                    <h2>Sign Up</h2>
                </div>
                <form action="" method="post">
                    <div>
                        <label htmlFor="fname">Email address</label>
                        <input type="email" onInputCapture={(e: any) => setEmail(e.target.value)} placeholder="someone@gmail.com" id="fname" name="fname" />
                        <label htmlFor="lname">Password</label>
                        <input type="password" onInputCapture={(e: any) => setPassword(e.target.value)} placeholder="Your Password" id="lname" name="lname" />
                        {loginErrors}
                        <PrimaryButton onClick={createAccount} title={"Create Account"} />
                    </div>
                </form>
                <span>Already have an Account? <a onClick={() => switchMode("Sign Up")}>Sign In</a></span>
            </div>
        </div >
    )
}