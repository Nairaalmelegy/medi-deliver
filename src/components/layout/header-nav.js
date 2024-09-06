import Link from "next/link";
/**
 * header-nav: for the navbar implementation
 * @returns: the nav form designed
 */
export default function Header(){
    return(
        <header className="flex items-center justify-between">
      <Link className="text-primary font-semibold text-2xl" href="">MediDeliver</Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={''}>Home</Link>
        <Link href={''}>Products</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
        <Link href={''} className="bg-primary text-white rounded-full px-6 py-2">LogIn</Link>
      </nav>
    </header>
    )
}