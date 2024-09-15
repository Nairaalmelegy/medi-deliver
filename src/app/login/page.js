"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginProgress,  setLoginProgress] = useState(false);


    
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginProgress(true);
        
        await login('credentials', {email, password});

        setLoginProgress(false);
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4 font-semibold">Login</h1>
            <form className="block max-w-xs mx-auto"  onSubmit={handleFormSubmit}>

                <input type="email" name="email" placeholder="Enter your email" 
                    disabled={setLoginProgress}
                    value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" name="password" placeholder="Enter your password"
                    disabled={setLoginProgress}
                    value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button type={'submit'} disabled={setLoginProgress}>
                    Login</button>
                <div className="my-4 text-center text-gray-600">
                    or login with provider
                </div>
                <button className="text-black flex gap-4 justify-center">
                    <Image  className="mt-0.5" src={'/Logo-google-icon-PNG.png'} alt='google icon' width={20} height={20}/>
                    Login with google</button>
                    <div className="text-center my-4 text-gray-600">
                        Not a member ?{' '}
                        <Link className={'underline font-semibold'}href={'/login'}>Register here</Link>
                    </div>
            </form>
        </section>
    );
}