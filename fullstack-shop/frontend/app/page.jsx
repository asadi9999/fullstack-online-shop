"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
// import '../../css/Content.css';
// import Image from '@next'
function Content() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
       setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
    <div className=" w-full h-20"></div>
      <div className="wrapper grid md:grid-cols-4 gap-0 top-40">
        <div className="sidebar-left">
          <h3>
            <a href="http://">Other Services</a>
          </h3>
          <h3>
            <a href="http://">Our Address</a>
          </h3>
          <h3>
            <a href="http://">Social Network</a>
          </h3>
          <button
            type="button"
            data-ripple-light="true"
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            Button
          </button>
        </div>
        <div className="main md:col-span-3 p-3">
          <div className="grid lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                className="card w-full relative border-2 rounded-lg p-2 opacity-65 hover:opacity-100 
                transition-all duration-500 hover:cursor-pointer"
                key={product._id}
              >
                <Image
                  src={`data:${product.image.contentType};base64,${Buffer.from(
                    product.image.data
                  ).toString("base64")}`}
                  alt={product.name}
                  width={350}
                  height={250}
                  className=" bg-blend-multiply object-cover w-full sm:h-48 overflow-hidden md:w-3/4"
                />
                <div className="w-full overflow-hidden">
                  <span>{product.name}</span>
                  <span className="block text-sm text-gray-400">
                    Company: {product.company}
                  </span>
                </div>
                <div className="m-4">
                  <span>price: {product.price}</span>
                </div>
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span>Description: </span>
                  <div className=" w-full h-[5rem] overflow-y-scroll scrollbar-none ">
                    <p className=" text-justify text-white/50">{product.des}</p>
                  </div>
                </div>
                <div className="badge w-full absolute top-1 text-indigo-600 text-xl">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </i>
                  <p className=" text-white/40 w-full overflow-x-hidden">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
