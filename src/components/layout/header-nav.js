'use client';
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
/**
 * header-nav: for the navbar implementation
 * @returns: the nav form designed
 */
export default function Header(){
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData  = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }
  return(
        <header className="flex items-center justify-between">
      
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
      <Link className="text-primary font-semibold text-2xl" href="/">MediDeliver</Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/all-products'}>Products</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
      </nav>

      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'}
            className="whitespace-nowrap">
            {userName}
            </Link>
            <button 
            onClick={() => signOut()} 
            className="bg-primary text-white rounded-full px-6 py-2">LogOut</button>

          </>
          
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href={'/login'} >Login</Link>
            <Link href={'/register'} className="bg-primary text-white rounded-full px-6 py-2">Register</Link>

          </>
        )}
      
      </nav>
    </header>
    )
}