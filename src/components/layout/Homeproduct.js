'use client';
import { useState, useEffect } from "react";
import SectionHeaders from "./sectionHeaders";
import ProductItem from "../products/product-items";

export default function HomeProduct() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the database
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data); // Assuming the response is an array of category objects
      })
      .catch((err) => {
        console.error("Error fetching categories: ", err);
      });
  }, []);

  return (
    <section className="">
      <div className="text-center">
        <SectionHeaders subHeader={"CHECK OUT"} mainHeader={"BEST SELLERS"} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <ProductItem
              key={category._id}
              name={category.name}
              description={category.description}
              image={category.image || "/medicine.png"} // Default image if not provided
            />
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </section>
  );
}
