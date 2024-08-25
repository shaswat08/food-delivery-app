import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { axiosInstance } from "../utils/axiosInstance";

const Add = () => {
  const [error, setError] = useState("");
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("image", image);
    formData.append("category", data.category);

    try {
      const response = await axiosInstance.post("/api/food/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        setError("");
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: "",
        });
        setImage(false);
      }
      
    } catch (error) {
      if (error?.response?.data) {
        setError(error?.response?.data?.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <div className="w-[70%] ml-16 mt-12">
      <form onSubmit={handleSubmit} className="p-7 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-2xl tracking-wider">Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-[180px] h-[120px] object-cover"
            />
          </label>
          <input
            id="image"
            type="file"
            hidden="true"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl tracking-wider">Product Name</p>
          <input
            className="outline-none bg-red-100 max-w-[60%] p-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-600"
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl tracking-wider">Product Description</p>
          <textarea
            className="outline-none bg-red-100 w-[60%] p-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-600"
            rows="6"
            name="description"
            placeholder="Description"
            required
            value={data.description}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex justify-between w-[60%]">
          <div>
            <p className="text-md tracking-wider"> Product Category</p>
            <select
              className="outline-none bg-red-100 p-4 rounded-md text-sm focus:ring-1 focus:ring-zinc-600"
              name="category"
              value={data.category}
              onChange={handleOnChange}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div>
            <p className="text-md tracking-wider"> Product Price </p>
            <input
              className="outline-none bg-red-100 p-4 rounded-md text-sm focus:ring-1 focus:ring-zinc-600"
              type="number"
              name="price"
              placeholder="$20"
              value={data.price}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <button
          className="max-w-[15%] p-2 bg-gray-500 text-white rounded-lg"
          type="submit"
        >
          ADD
        </button>
        {error && <p className="mt-3 text-sm text-red-600"> {error}</p>}
      </form>
    </div>
  );
};

export default Add;
