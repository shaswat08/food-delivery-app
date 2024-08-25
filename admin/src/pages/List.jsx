import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const List = () => {
  const [listItems, setListItems] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axiosInstance.get("/api/food/list");

      if (response?.data?.success) {
        setListItems(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await axiosInstance.post(`/api/food/remove/${id}`);
      await fetchList();

      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {}
  };

  return (
    <div className="ml-16 mt-12 flex-1">
      <div className="p-5">
        <h1 className="text-3xl font-bold tracking-wider mb-6">
          List of Food Items
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-left">
                <th className="py-3 px-4 font-semibold text-gray-700">Image</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Category
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-center">
                    <img
                      className="h-[80px] w-[80px] object-cover rounded-lg"
                      src={`http://localhost:4000/images/${item.image}`}
                      alt={item.name}
                    />
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">
                    ${item.price}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-300 ml-4"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
