'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/Tabs";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [phone,  setPhone] = useState('');
    const [streetAddress,  setStreetAddress] = useState('');
    const [city,  setCity] = useState('');
    const [postalCode,   setPostalCode] = useState('');
    const [country,  setCountry] = useState('');
    const [isAdmin,  setIsAdmin] = useState(false);
    const [profileFetched,  setProfileFetched] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setUserName(session.user.name || '');
            
            fetch('/api/profile').then(response => {
                response.json().then(data =>{
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setCity(data.city);
                    setPostalCode(data.postalCode);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
                .catch(error => console.error('Error fetching profile:', error));

        }
    }, [session, status]);
    

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        setError('');
    
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: userName,
                    streetAddress: streetAddress,
                    city: city,
                    postalCode: postalCode,
                    country: country,
                    phone: phone
                 }),
            });
    
            // Check if response is OK
            if (!response.ok) {
                const error = await response.text(); // Get the error response as text
                console.error('Update failed:', error);
                // Handle error accordingly (e.g., show an error message to the user)
                setError('Failed to update profile. Please try again later.');

                return;
            }
    
            // Attempt to parse JSON
            const data = await response.json();
    
            // If the update was successful
            setSaved(true);
        } catch (error) {
            console.error('Unexpected error:', error);
            // Handle unexpected errors
            setError('Unexpected error occurred.')
        } finally {
            setIsSaving(false);
        }
    }
    

    if (status === 'loading') {
        return "Loading...";
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            <div className="max-w-md mx-auto mt-8">
                <div className=" flex gap-2">
                    <div className="items-center bg-blue-50 p-4 rounded-2xl text-center
                            hover:bg-blue-100 hover:shadow-2xl hover:shadow-gray transition-all">
                        <Image src={'/avatar.png'} width={80} height={80} alt={'avatar'} />
                    </div>
                    
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input
                            type="text"
                            placeholder="First and last name"
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                        />
                        <input
                            type="email"
                            disabled={true}
                            value={session?.user?.email || ''}
                        />
                        <input 
                            type="tel" 
                            placeholder="Phone number"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                            />
                        <input type="text" placeholder="Street address"
                            value={streetAddress}
                            onChange={ev => setStreetAddress(ev.target.value)}
                            />
                        <div className="flex gap-2">
                        <input type="text" placeholder="Postal Code"
                            value={postalCode}
                            onChange={ev => setPostalCode(ev.target.value)}
                            />
                        <input type="text" placeholder="City"
                            value={city}
                            onChange={ev => setCity(ev.target.value)}
                        />
                        </div>
                        <input type="text" placeholder="Country"
                            value={country}
                            onChange={ev => setCountry(ev.target.value)}
                            />
                        <button type="submit">
                            {isSaving? 'Saving...':'Save'}
                        </button>
                        {saved && <p className="text-green-500">Profile Updated successfully!</p>}
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
}
