'use client';

import UserTabs from "@/components/layout/Tabs";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Left from "@/components/icons/leftarrow";
import { useParams } from "next/navigation";
import { Product } from "@/models/Product";

export default function editProduct(){
    const {loading, data} = useProfile();
    const [name,  setName] = useState('');
    const [description,  setDescription] = useState('');
    const [price,   setPrice] = useState('');
    const [message, setMessage] = useState("");
    const {id} = useParams();
    const [categories,  setCategories] = useState([]);
    const [category, setCategory] = useState(Product?.category || '');

    useEffect(() =>{
        fetch('/api/categories').then(res =>{
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);
    useEffect(()=>{
        fetch('/api/products').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                if (item) {
                    setName(item.name);
                    setDescription(item.description);
                    setPrice(item.price);
                } else {
                    setMessage('Product not found');
                }
            });
        });
    }, [id]);

    async function handleDeleteClick(){
        const res = await fetch('/api/products?_id='+id, {
            method: 'DELETE',

        })
    }
    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data = { name, description, price, _id: id };
    
        const response = await fetch('/api/products', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log('Product created:', result);
            setMessage('Product created successfully');
        } else {
            setMessage('Failed to create product');
        }
        setName('');
        
    }
    if(loading){
        return 'Loading user info...';
    }

    if (!data.admin){
        return 'You are not an admin';
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
        <UserTabs isAdmin={true}/>
        <div className="max-w-md mx-auto mt-8">
            <Link href={'/products'} className="justify-center bg-gray-50 text-gray-600 rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-1">
            <Left/>
            <span>Show all Products</span>
            </Link>
        </div>
        <form className="mt-8" onSubmit={handleFormSubmit}>
            <div className="flex gap-2 items-start">
                <div>
                    <Image 
                    className={"bg-blue-50 p-1 rounded-md text-center hover:bg-blue-100 hover:shadow-2xl hover:shadow-gray transition-all"} 
                    src={'/medicine.png'} alt={''} width={120} height={120}/>
                </div>
                <div className="grow">
                    <label className="text-gray-600 font-semibold">Product Name</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-400"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <label className="text-gray-600 font-semibold">Description</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-400"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />
                    <label className="text-gray-600 font-semibold">Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)} >
                        {categories?.length > 0 && categories.map(c => (
                            <option value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label className="text-gray-600 font-semibold">Price</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-400"
                        value={price}
                        onChange={ev => setPrice(ev.target.value)}
                    />
                    <button type="submit" onSubmit={handleFormSubmit}>Save</button>
                </div>
            </div>
        </form>
        {/* Display the message */}
        {message && (
            <p className="mt-4 text-sm text-green-600">{message}</p>
        )}
        <div className="max-w-md mx-auto mt-4">
            <div className="max-w-xs ml-auto pl-4">
            <button
            onClick={handleDeleteClick}
            className="text-gray-600"
            >
                Delete this Product</button>
            </div>
        </div>
    </section>
    );
}