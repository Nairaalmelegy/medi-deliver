'use client';

import Right from "@/components/icons/rightarrow";
import UserTabs from "@/components/layout/Tabs";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";


export default function Products(){
    const [products ,  setProducts] = useState([]);

    const {loading, data} = useProfile();
    
    useEffect(() => {
        fetch ('/api/products').then(res => {
            res.json().then(products => {
                setProducts(products);
            });
        })
    }, []);

    if(loading){
        return 'Loading user info...';
    }

    if (!data.admin){
        return 'Not an admin';
    }
    return(
       <section className="mt-8 max-w-md mx-auto">
        <UserTabs isAdmin={true}/>

        <div className="mt-8">
            <Link
                href ={'/products/new'}
                className="justify-center bg-gray-50 text-gray-600 rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-1"
            >
                Create New Product
                <Right/>
            </Link>
        </div>
        <div>
            <h2 className="text-sm text-gray-600 mt-8">Edit Products</h2>
            <div className="grid grid-cols-3 gap-5 ">
                {products?.length > 0 && products.map(item => (
                    <Link 
                    key={item._id}
                    href={'/products/edit/${item._id}'} 
                    className="bg-blue-50 p-4 rounded-md text-center
                hover:bg-blue-100 hover:shadow-2xl hover:shadow-gray transition-all">
                        <div className="relative">
                        <Image src={'/medicine.png'} alt={''} width={100} height={100}/>
                        </div>
                        <div className="text-center">
                        {item.name}
                        </div>
                    </Link>
                ))}
            </div>
           
        </div>
       </section>
    );
}