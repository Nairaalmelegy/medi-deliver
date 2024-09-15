import Link from "next/link";
import Header from "@/components/layout/header-nav"
import Hero from "@/components/layout/Hero-section";
import HomeProduct from "@/components/layout/Homeproduct";
export default function Home() {
  return (
    <>
    
    <Header />
    <Hero/>
    <HomeProduct/>
    </>
  );
}
