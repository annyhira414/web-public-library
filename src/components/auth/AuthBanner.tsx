import React from "react";

export const AuthBanner = () => {
  return (
    <div className="bg-[url('/images/account.jpg')] h-[260px]">
      <div className="bg-gradient-to-t from-gray-900 h-full opacity-90">
        <p className="pt-[75px] flex justify-center h-[96px] font-semibold text-[64px] text-library-white">
          Account
        </p>
        <p className="h-7 flex justify-center font-medium text-base text-library-white  mt-[68px]">
          Home/Log in
        </p>
      </div>
    </div>
  );
};
