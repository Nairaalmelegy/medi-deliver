'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/Tabs";
import {useProfile} from "@/components/UseProfile";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function EditUserPage() {
  const {loading, data} = useProfile();
  const [user, setUser] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetch('/api/profile?_id='+id).then(res => {
      res.json().then(user => {
        setUser(user);
      });
    })
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data,_id:id}),
      });
  }

  if (loading) {
    return 'Loading user profile...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}