import Image from "next/image";
import Right from "../icons/rightarrow";

/**
 * Hero-section: for the caption of the first section
 * @returns: the layout and implementation 
 * of this section
 */
export default function Hero(){
    return(
        <section className="hero">
            <div className="py-12">
            <h1 className="text-4xl font-semibold">Your Medicine, Delivered with Care</h1>
            <p className="mt-4 text-gray-600">Fast and reliable medicine delivery to your doorstep. 
                Order prescriptions, over-the-counter medications, and more with just a few clicks. 
                Stay healthy, We will handle the rest
            </p>
            <div className="flex gap-4 text-sm">
                <button 
                className="bg-primary items-center uppercase flex gap-2 text-white px-4 py-2 rounded-full">
                    Order now
                    <Right/>
                </button>
                <button className="flex gap-2 py-2 text-gray-700 font-semibold">
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