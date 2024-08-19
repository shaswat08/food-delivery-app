import React from "react";

const Header = () => {
  return (
    <div className="h-[34vw] w-[80%] my-10 mx-auto bg-[url('/header_img.png')] bg-contain bg-no-repeat relative">
      <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
      <div className="absolute flex flex-col items-start gap-5 max-w-[50%] bottom-[10%] left-[8vw] animate-fadeIn">
        <h1 className="text-5xl font-bold text-slate-200">
          Order your favourite food here
        </h1>
        <p className="text-sm text-slate-200">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
          delectus laboriosam aspernatur voluptas quibusdam quidem vitae rerum
          dolorum, pariatur accusamus temporibus itaque recusandae, voluptates
          quo, amet blanditiis fuga unde officia!
        </p>
        <button className="px-4 py-2 border-none rounded-full bg-slate-200">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
