'use client';
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser,  setCreatingUser] = useState(false);
    const [userCreated,  setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}

        });
        
        setCreatingUser(false);
        if(response.ok){
            setUserCreated(true);
        }else{
            setError(true);
        }

    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold">
                Register</h1>

            {/*Success Message*/}
            {userCreated && (
                <div className="my-4 text-center text-green-600">
                    User Created successfully!<br/>
                    Now you can {' '}<Link  className="underline font-semibold" href={'/login'}>Login</Link>.
                </div>
            )}

            {/*Error Message*/}
            {error && (
                <div className="my-4 text-center text-red-600">
                    Error in creating account.
                    <br/> Please try again later.
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email"
                    value={email}
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password"
                    value={password}
                    disabled={creatingUser}
                    onChange={ev => setPassword(ev.target.value)}/>
                <button type="submit" disabled={creatingUser}>
                    {creatingUser ? 'Creating account...': 'Register'}
                </button>
                <div className="text-center my-4 text-gray-700 border-t pt-4">
                    Already a member? {' '}<Link className="underline font-semibold" href ={'/login'}>Login</Link>
                </div>
            </form>
        </section>
    );
}