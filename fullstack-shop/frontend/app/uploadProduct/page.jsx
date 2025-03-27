"use client";
import { useState } from "react";
import axios from "axios";

function Upload() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");
  const [file, setFile] = useState(null);
  const [error,setError] = useState('plz enter value')
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadProduct = async () => {
    //  Check if any input is empty or if the file is not selected
    if (!name || !des || !price || !file || !company) {
      setError( "Please fill in all fields and select a file.");
      // setError()=>{error('jhgghgg')}
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("des", des);
    formData.append("company", company);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data.message);
      setName("");
      setCompany("");
      setPrice("");
      setDes("");
      setFile(null);
      setError('');
    } catch (error) {
      console.error("Failed to upload product:", error);
      setError('Failed to upload product. Please try again.');
    }
  };

  return (
    <>
      <div className=" w-full h-20"></div>
      <div className=" grid grid-cols-4">
        <div className=" col-start-2 col-span-2 bg-[#2d2e2f] rounded-md flex flex-col gap-8 p-2 justify-center items-center">
          <h1>Upload New Product</h1>
          <h1>{error}</h1>
          <input
            className=" w-full text-white rounded-md py-2 px-3 bg-[#212223]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className=" w-full text-white rounded-md py-2 px-3 bg-[#212223]"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
          />
          <input
            className=" w-full text-white rounded-md py-2 px-3 bg-[#212223]"
            type="text"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            placeholder="Description"
          />
          <input
            className=" w-full text-white rounded-md py-2 px-3 bg-[#212223]"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            step={'0.01'}
          />
          <input
            className=" w-full text-white rounded-md py-2 px-3 bg-[#212223]"
            type="file"
            onChange={handleFileChange}
          />
          <button
            onClick={uploadProduct}
            className=" bg-[#72f64a] rounded-md px-3 py-2 w-[15rem] hover:bg-[#3bf635] transition-all duration-300"
          >
            Upload Product
          </button>
        </div>
      </div>
    </>
  );
}

export default Upload;
