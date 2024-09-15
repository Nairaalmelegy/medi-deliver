import Image from "next/image";
import Right from "../icons/rightarrow";

/**
 * Hero-section: for the caption of the first section
 * @returns: the layout and implementation 
 * of this section
 */
export default function Hero(){
    return(
        <section className="hero bg-hero-image bg-cover bg-center">
            <div className="py-20 mt-20">
            <h1 className="text-6xl font-semibold">Your Medicine, Delivered with Care</h1>
            <p className="my-6 text-gray-800 text-m">Fast and reliable medicine delivery to your doorstep. 
                Order prescriptions, over-the-counter medications, and more with just a few clicks. 
                Stay healthy, We will handle the rest
            </p>
            <div className="flex gap-4 text-sm">
                <button 
                className="bg-primary items-center uppercase flex gap-2 text-white px-2 py-2 rounded-full">
                    Order now
                    <Right/>
                </button>
                <button className="flex gap-2 py-2 text-gray-800 font-semibold">
                    Learn more
                    <Right/>
                </button>
            </div>
            </div>
            
            <div className="relative">
                <Image src="/Hero.png" layout="fill" objectFit="contain" alt="Care"/>
            </div>
        </section>
    )
}