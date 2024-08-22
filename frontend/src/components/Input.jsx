import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="flex items-center relative">
      <Icon size={12} className="absolute left-2" />
      <input
        className="p-1 w-full text-black pl-7 rounded-smtext-md outline-none focus:ring-2 focus:ring-slate-400"
        {...props}
      />
    </div>
  );
};

export default Input;
