'use client';
import UserTabs from "@/components/layout/Tabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const { loading: profileLoading, data } = useProfile();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        
        // Check if the response is OK
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        // Parse the response as JSON
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setLoadingUsers(false);
      }
    }
    
    fetchUsers();
  }, []);

  // Handle profile loading state
  if (profileLoading) {
    return 'Loading profile...';
  }

  // Check if the user is an admin
  if (!data?.admin) {
    return 'Not an admin';
  }

  // Handle users loading state
  if (loadingUsers) {
    return 'Loading users...';
  }

  // Handle error
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users.length > 0 ? (
          users.map(user => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name ? (
                    <span>{user.name}</span>
                  ) : (
                    <span className="italic">No name</span>
                  )}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={`/users/${user._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </section>
  );
}
