import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

export const MembershipBenefit = () => {
  const language = Cookies.get("language");
  return (
    <div className="benefit pl-8 pr-16 py-8">
      <h4 className="font-playfairDisplay font-bold text-library-primary text-xl mb-4">
        {localeString(language, "memberBenefit")}
      </h4>
      <div className="benefit-list flex">
        <div className="list-icon mt-1 mr-2 text-library-primary">
          <IoMdCheckmark />
        </div>
        <div className="list-text">
          <p className="text-gray-700 text-sm">
            {localeString(language, "bookCollection")}
          </p>
        </div>
      </div>
      <div className="benefit-list flex my-3">
        <div className="list-icon mt-1 mr-2 text-library-primary">
          <IoMdCheckmark />
        </div>
        <div className="list-text">
          <p className="text-gray-700 text-sm">
            {localeString(language, "meterials")}
          </p>
        </div>
      </div>
      <div className="benefit-list flex ">
        <div className="list-icon mt-1 mr-2 text-library-primary">
          <IoMdCheckmark />
        </div>
        <div className="list-text">
          <p className="text-gray-700 text-sm">
            {localeString(language, "discount")}
          </p>
        </div>
      </div>
      <div className="benefit-list flex my-3">
        <div className="list-icon mt-1 mr-2 text-library-primary">
          <IoMdCheckmark />
        </div>
        <div className="list-text ">
          <p className="text-gray-700 text-sm">
            {localeString(language, "useOfLibraryMaterials")}
          </p>
        </div>
      </div>
      <div className="benefit-list flex">
        <div className="list-icon mt-1 mr-2 text-library-primary">
          <IoMdCheckmark />
        </div>
        <div className="list-text">
          <p className="text-gray-700 text-sm">
            {localeString(language, "opportunities")}
          </p>
        </div>
      </div>
    </div>
  );
};
