'use client';
import {signIn} from  'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress,  setLoginInProgress] = useState(false);
    const [loginMessage,  setLoginMessage] = useState('');
    const [loginSuccess,   setLoginSuccess] = useState(false);


    
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);
        
        const response = await signIn('credentials', {
            email,
            password,
            redirect: false,
            // callbackUrl: '/'
        });
        
        setLoginInProgress(false);

        if(response?.error){
            setLoginMessage('Login Failed, please check your data');
            setLoginSuccess(false);
        }else{
            setLoginMessage('Welcome back! Successfully logged in.');
            setLoginSuccess(true);
        }
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold">
                LogIn</h1>
            {loginMessage && (
                <p className={`text-center mt-4 font-semibold ${loginSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {loginMessage}
                </p>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email"
                    value={email}
                    name="email"
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password"
                    value={password}
                    name="password"
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}/>
                <button type="submit" disabled={loginInProgress}>
                    {loginInProgress ? 'Logging in...' : 'Login'}
                </button>
                <div className="text-center my-4 text-gray-700 border-t pt-4">
                    Not a member? {' '}<Link className="underline font-semibold" href ={'/register'}>Register</Link>
                </div>
            </form>
        </section>
    );
}