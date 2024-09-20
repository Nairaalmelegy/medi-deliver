'use client';

import UserTabs from "@/components/layout/Tabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Left from "@/components/icons/leftarrow";
import { useParams } from "next/navigation";

export default function EditProduct() {
    const { loading, data } = useProfile();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams();

    // Fetch categories for the dropdown list
    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(categories => {
                setCategories(categories);
            });
    }, []);

    // Fetch the product by its ID to pre-fill the form
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(items => {
                const item = items.find(i => i._id === id);
                if (item) {
                    setName(item.name);
                    setDescription(item.description);
                    setPrice(item.price);
                    setCategory(item.category || ''); // Pre-fill the category
                } else {
                    setMessage('Product not found');
                }
            });
    }, [id]);

    // Handle form submission for editing product
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setIsSubmitting(true); // Start loading state
        const data = { name, description, price, category, _id: id };

        const response = await fetch('/api/products', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });

        setIsSubmitting(false); // End loading state
        if (response.ok) {
            setMessage('Product updated successfully');
        } else {
            const error = await response.text();
            setMessage(`Failed to update product: ${error}`);
        }

        // Optionally, reset form fields
        // setName('');
        // setDescription('');
        // setPrice('');
        // setCategory('');
    }

    // Handle product deletion
    async function handleDeleteClick() {
        const res = await fetch(`/api/products?_id=${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setMessage('Product deleted successfully');
        } else {
            const error = await res.text();
            setMessage(`Failed to delete product: ${error}`);
        }
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'You are not an admin';
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/products'} className="justify-center bg-gray-50 text-gray-600 rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-1">
                    <Left />
                    <span>Show all Products</span>
                </Link>
            </div>
            <form className="mt-8" onSubmit={handleFormSubmit}>
                <div className="flex gap-2 items-start">
                    <div>
                        <Image
                            className="bg-blue-50 p-1 rounded-md text-center hover:bg-blue-100 hover:shadow-2xl hover:shadow-gray transition-all"
                            src={'/medicine.png'} alt={'product image'} width={120} height={120}
                        />
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
                        <select
                            value={category}
                            onChange={ev => setCategory(ev.target.value)}
                            className="w-full p-2 border border-gray-400"
                        >
                            {categories?.length > 0 && categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>

                        <label className="text-gray-600 font-semibold">Price</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-400"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
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
                        className="text-gray-600 bg-red-500 py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Delete this Product
                    </button>
                </div>
            </div>
        </section>
    );
}
