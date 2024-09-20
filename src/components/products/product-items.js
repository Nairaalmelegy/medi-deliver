export default function ProductItem(){
    return(
                <div className="bg-blue-50 p-4 rounded-md text-center
                hover:bg-blue-100 hover:shadow-2xl hover:shadow-gray transition-all">
                    <div className="text-center">
                    <img src="/medicine.png" 
                    className="max-h-auto max-h-24 block mx-auto"
                     alt="Skincare"/>
                    </div>
                    <h4 className="font-semibold text-xl my-3">Skin Care</h4>
                    <p className="text-gray-500 text-sm">Keep your skin healthy and glowing with our 
                        expert skincare products. Hydrate, protect, 
                        and enhance your natural beauty.</p>

                    <button className="bg-primary mt-4 text-white rounded-full px-8 py-2"> Add to cart $250</button>
                </div>
    );
}