'use client';
import {signIn} from  'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress,  setLoginInProgress] = useState(false);

    
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials', {email, password, callbackUrl: '/'});
        
        setLoginInProgress(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold">
                LogIn</h1>
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
                <button type="submit" disabled={loginInProgress}>Login</button>
                <div className="text-center my-4 text-gray-700 border-t pt-4">
                    Not a member? {' '}<Link className="underline font-semibold" href ={'/register'}>Register</Link>
                </div>
            </form>
        </section>
    );
}