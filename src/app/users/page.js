'use client';
import UserTabs from "@/components/layout/Tabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";


export default function UsersPage(){
    
    const {loading,data} = useProfile();
    const [users,  setUsers] = useState([]);


    useEffect(() =>{
        fetch('/api/users').then(response => {
            response.json().then(users =>{
                setUsers(users);
            });
        })
    }, []);
    if(loading){
        return 'Loading user info...';
    }
    
    if (!data.admin){
        return 'You are not an admin';
    }
    return(
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true}/>
            <div>
                {users?.length > 0 && users.map(user =>(
                    <div className="bg-gray-300 rounded-lg mb-2 p-4">

                    </div>
                ))}
            </div>
        </section>
    );
}