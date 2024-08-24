import React from "react";

const Header = () => {
  return (
    <div className="h-[32vw] my-8 mx-auto bg-[url('/burger.jpg')] bg-cover bg-center relative">
      <div className="absolute flex flex-col items-start gap-6 max-w-[50%] bottom-[20%] right-[3vw] animate-fadeIn">
        <h1 className="text-5xl font-bold text-slate-600">
          Order your favourite food here
        </h1>
        <p className="text-md text-slate-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
          delectus laboriosam aspernatur voluptas quibusdam quidem vitae rerum
          dolorum, pariatur accusamus temporibus itaque recusandae, voluptates
          quo, amet blanditiis fuga unde officia!
        </p>
        <button
          onClick={() => {
            document
              .getElementById("menu")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-4 py-2 mt-1 border-none rounded-full bg-slate-500 text-red-200 tracking-wider transform hover:scale-105 duration-200"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
