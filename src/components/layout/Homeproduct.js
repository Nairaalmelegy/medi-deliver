import Image from "next/image";
import ProductItem from "../products/product-items";

export default function HomeProduct(){
    return (
        <section className="">
            <div className="text-center">
            <h3 className="text-gray-600 font-semibold">BEST SELLER</h3>
            <h2 className="text-primary font-bold text-4xl mb-4">Products</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
            </div>
        </section>
    );
}