'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function UserTabs({isAdmin}){
    const path = usePathname();

    return(
        <div className="flex mx-auto gap-5 tabs py-5 justify-center">
                <Link 
                    className={path === '/profile'?'active':''} 
                    href={'/profile'}
                >
                    Profile</Link>
                {isAdmin && (
                    <>
                    <Link 
                        href={'/categories'}
                        className={path === '/categories'?'active':''}
                    >
                        Categories</Link>
                    <Link 
                        href={'/products'}
                        className={path.includes('products')?'active':''}
                    >
                        Products</Link>
                    <Link 
                        href={'/users'}
                        className={path === '/users'?'active':''}
                    >
                        Users</Link>
                    </>
                )}
            </div>
    );
}