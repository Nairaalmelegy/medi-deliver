import { useContext } from "react";
import { CartContext } from "../AppContext";
import { useState } from "react";

export default function ProductItem(menuItem) {
  const {
    name, description, image, price,
  } = menuItem;

  function handleAddToCartButtonClick(){
    addToCart(menuItem);
  }
  const [showPopup,  setShowPopup] = useState(false);

  const {addToCart} = useContext(CartContext);
  return (
    <div className="bg-blue-50 p-4 rounded-md text-center hover:bg-blue-100 hover:shadow-2xl hover:shadow-gray transition-all flex flex-col justify-between h-full">
      <div>
        <div className="text-center">
          <img src={image} className="max-h-24 block mx-auto" alt={name} />
        </div>
        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <button
      type="button" 
      onClick={handleAddToCartButtonClick}
      className="bg-primary mt-4 text-white rounded-full px-8 py-2">
        Add to cart ${price} {/* Display price dynamically */}
      </button>
    </div>
  );
}
