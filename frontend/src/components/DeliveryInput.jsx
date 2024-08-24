import React from "react";

const DeliveryInput = ({ icon: Icon, ...props }) => {
  return (
    <div className="flex items-center relative">
      <Icon size={12} className="absolute left-2" />
      <input
        className="p-1 w-full text-black pl-7 rounded-smtext-md outline-none border-2 border-gray-500 focus:ring-2 focus:ring-slate-400 focus:border-none"
        {...props}
      />
    </div>
  );
};

export default DeliveryInput;
