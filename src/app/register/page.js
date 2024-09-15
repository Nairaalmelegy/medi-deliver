"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser,  setCreatingUser] = useState(false);
    const [userCreated,  setUserCreated] = useState(false);
    const  [error, setError] = useState(false);


    async function handleFormSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok){
            setUserCreated(true);
        }
        else {
            setError(true);
        }
        
        setCreatingUser(false);
    }

    
    return(
        
        <section className="mt-8 register">
            <h1 className="text-center text-primary text-4xl mb-4 font-semibold">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">
                    Thanks for registering.<br/>Now you can{' '}
                    <Link className="underline" href={'/login'}>LogIn</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    Something Wrong!.<br/>Please Check your data again.
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Enter your username"
                    disabled={creatingUser}
                    value={username} onChange={ev => setUsername(ev.target.value)}/>
                <input type="email" placeholder="Enter your email" 
                    disabled={creatingUser}
                    value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Enter your password"
                    disabled={creatingUser}
                    value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button type={'submit'} disabled={creatingUser}>
                    Register</button>
                <div className="my-4 text-center text-gray-600">
                    or login with provider
                </div>
                <button className="text-black flex gap-4 justify-center">
                    <Image  className="mt-0.5" src={'/Logo-google-icon-PNG.png'} alt='google icon' width={20} height={20}/>
                    Login with google</button>
                    <div className="text-center my-4 text-gray-600">
                        Already a member ?{' '}
                        <Link className={'underline font-semibold'}href={'/login'}>Login here</Link>
                    </div>
            </form>
        </section>
    );
}