'use client';
import { useState, useEffect } from "react";
import SectionHeaders from "./sectionHeaders";
import ProductItem from "../products/product-items";

export default function HomeProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the database
    fetch('/api/products') // Update to the correct endpoint
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // Assuming the response is an array of product objects
      })
      .catch((err) => {
        console.error("Error fetching products: ", err);
      });
  }, []);

  return (
    <section className="">
      <div className="text-center">
        <SectionHeaders subHeader={"CHECK OUT"} mainHeader={"BEST SELLERS"} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product._id}
              name={product.name}
              description={product.description}
              image={product.image || "/medicine.png"} // Default image if not provided
              price={product.price} // Assuming price is a field in the product object
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </section>
  );
}
