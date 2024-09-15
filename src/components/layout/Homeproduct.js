import Image from "next/image";
import ProductItem from "../products/product-items";
import SectionHeaders from "./sectionHeaders";

export default function HomeProduct(){
    return (
        <section className="">
            <div className="text-center">
                <SectionHeaders
                    subHeader={'CHECK OUT'}
                    mainHeader={'BEST SELLERS'}/>
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