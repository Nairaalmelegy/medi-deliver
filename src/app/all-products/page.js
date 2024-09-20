'use client';
import SectionHeaders from "@/components/layout/sectionHeaders";
import ProductItem from "@/components/products/product-items";
import {useEffect, useState} from "react";


// MenuPage Component: Displays product categories and associated items
export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  
  
  // useEffect hook to fetch data on component mount
  useEffect(() => {
    // Fetch categories from the API and update the state
    fetch('/api/categories').then(res => {
      res.json().then(categories => setCategories(categories))
    });
    // Fetch products from the API and update the state
    fetch('/api/products').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    });
  }, []); // Empty dependency array ensures this only runs once when the component is mounted
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <ProductItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}