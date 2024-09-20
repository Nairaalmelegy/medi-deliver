'use client';
import UserTabs from "@/components/layout/Tabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [CategoryName, setCategoryName] = useState("");
    const [message, setMessage] = useState(""); // State to track success/failure message
    const { loading: profileLoading, data: profileData } = useProfile();
    const  [categories, setCategories] = useState([]);
    const [editedCategory,  setEditedCategory] = useState(null);

    useEffect(() =>{
        fetchCategories();
    }, []);

    function fetchCategories(){
        fetch('/api/categories').then(res => {
            res.json().then(categories =>{
                setCategories(categories);
            });
        });
    }

    async function handleDeleteClick(_id){
        await fetch('/api/categories?._id='+_id, {
            method: 'DELETE',
        });

        fetchCategories();
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const data = {name:CategoryName};
        if (editedCategory){
            data._id = editedCategory._id;
        }
        const response = await fetch('/api/categories', {
            method: editedCategory? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        setCategoryName('');
        fetchCategories();
        // Check if the response is successful or not
        if (response.ok) {
            setMessage('Operation done successfully');  // Update message on success
            setCategoryName("");  // Clear the input after successful creation
        } else {
            setMessage('Failed to do this operation');  // Update message on failure
        }
    }

    if (profileLoading) {
        return "Loading user info...";
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label 
                            className="text-gray-600 font-semibold">
                                {editedCategory? 'Update Category': 'New Category Name'}
                                {editedCategory && (
                                    <>: <b>{editedCategory.name}</b></>
                                )}
                        </label>
                        <input 
                            type="text" 
                            value={CategoryName}
                            onChange={ev => setCategoryName(ev.target.value)} 
                        />
                    </div>
                    <div className="pb-0.5 flex gap-1">
                        <button type="submit" className="py-2 px-4">
                            {editedCategory? 'Update': 'Create'}
                        </button>
                        <button 
                        onClick={()=> {
                            setEditedCategory(null);
                            setCategoryName('');
                        }}
                        className="text-gray-600">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 mb-2 text-gray-600 font-semibold">Edit Category</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div 
                        onClick={() =>{ 
                            setEditedCategory(c);
                            setCategoryName(c.name);

                        }}
                        className="bg-gray-50 text-gray-600 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1"
                    >
                        <span
                         className="grow"
                         >{c.name}</span>
                         <div className="flex gap-1">
                         <button className="text-gray-600" type="button"
                         onClick={() => {
                            setEditedCategory(c);
                            setCategoryName(c.name);
                         }}>Edit</button>
                         <button className="text-gray-600"
                         onClick={() => handleDeleteClick()}
                          type="button">Delete</button>
                        </div>
                        
                    </div>
                ))}
            </div>

            {/* Display the message */}
            {message && (
                <p className="mt-4 text-sm text-green-600">{message}</p>
            )}
        </section>
    );
}

