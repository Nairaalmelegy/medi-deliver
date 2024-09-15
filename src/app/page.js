import Link from "next/link";
import Hero from "@/components/layout/Hero-section";
import HomeProduct from "@/components/layout/Homeproduct";
import SectionHeaders from "@/components/layout/sectionHeaders";
export default function Home() {
  return (
    <>
    
    
    <Hero/>
    <HomeProduct/>
    <section className="text-center my-16">
      <SectionHeaders
        subHeader={'WHO ARE WE ?'}
        mainHeader={'ABOUT US'}/>
      <p className="max-w-2xl mx-auto mt-4 text-gray-600">
        At MediDeliver, we are committed to providing fast 
        and reliable medicine delivery services to your doorstep. 
        Our mission is to make healthcare more accessible by offering a seamless 
        way to order prescriptions, over-the-counter medications, and health products online. 
        With a focus on care and convenience, we strive to support your well-being every step of the way.</p>
    </section>
    <section className="text-center my-8">
      <SectionHeaders 
        subHeader={'WANNA REACH OUT'}
        mainHeader={'CONTACT US'}/>
      <a className="text-lg text-gray-600 mt-8 underline" href="tel:+20101100479">
        +20 101 100 479
        </a>
      
    </section>
    
    </>
  );
}
