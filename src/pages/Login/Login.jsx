import React, { useState } from 'react'
import './Login.css'
import { auth } from '../../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider/StateProvider';
function Login() {
    const initial = { name: "", email: "", password: "" };
    const [info, dispatch] = useStateValue();
    const [data, setData] = useState(initial)
    const [page, setPage] = useState(true)
    const navigate = useNavigate();
    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log(userCredential)
                const user = userCredential.user;
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)

            });
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleRegister = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: `${data.name}`
                }).then(() => {
                    const user = auth.currentUser;
                    dispatch({
                        type: "UPDATED",
                        updated: true,
                    })
                    setData(initial);
                }).catch((error) => {
                    alert(error.message);
                });
                navigate('/')

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message)
            });
    }

    return (
        <div className='login'>
            <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="" />
            <div className="login_container">
                <h1>{page ? "Register" : "Sign In"}</h1>
                <form>
                    {
                        page && (
                            <>
                                <h5>Name</h5>
                                <input type="text" name="name" value={data.name} onChange={handleChange} />
                            </>
                        )
                    }
                    <h5>E-mail</h5>
                    <input type="text" name="email" value={data.email} onChange={handleChange} />
                    <h5>Password</h5>
                    <input type="password" name="password" value={data.password} onChange={handleChange} />
                    {!page && (<button type='submit' onClick={handleSignIn} className='btn login_signInButton'>Sign In</button>)}
                </form>
                {
                    !page && (
                        <p>
                            By signing-in you agree to the Amazon CLONE Conditions of Use & Sale. Please
                            see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                        </p>
                    )
                }
                {
                    page && (
                        <p>
                            By signing-up you agree to the Amazon CLONE Conditions of Use & Sale. Please
                            see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                        </p>
                    )
                }

                {page && (<button onClick={handleRegister} className='btn login_registerButton'>Create your Amazon Account</button>)}
                {page && (
                    <span className=' mt-[15px] text-[15px]' onClick={() => { setPage(!page) }}>Already have an account? <strong>Sign In</strong> </span>
                )}
                {!page && (
                    <span className=' mt-[15px] text-[15px]' onClick={() => { setPage(!page) }}>Don't have an account? <strong>Register here</strong> </span>
                )}
            </div>
        </div>
    )
}

export default Login