import React, {FC} from "react";
import {localeString} from "@/lib/helpers/utils";
import {Divider} from "antd";
import Cookies from "js-cookie";
import {IPublicationDetails} from "@/lib/model/publisher";

interface IDetailsProps {
  publisherData: IPublicationDetails | undefined;
}

export const Details: FC<IDetailsProps> = ({publisherData}) => {
  const language: string | undefined = Cookies.get("language");

  return (
    <div className="bg-white ">
      <>
        <div>
          <div className="sub-section-title ">
            {localeString(language, "publicationOrganizationName")}
          </div>
          <div className="sub-text py-2">
            {publisherData?.publication_name || "..."}
          </div>
        </div>
        <Divider className="mt-1" />
      </>
      <>
        <div>
          <div className="sub-section-title ">
            {localeString(language, "publicationOrganizationPhoneNumber")}
          </div>
          <div className="sub-text py-2">
            {publisherData?.organization_phone || "..."}
          </div>
        </div>
        <Divider className="mt-1" />
      </>

      <>
        <div className="sub-section-title ">
          {localeString(language, "publicationOrganizationEmailAddress")}
        </div>
        <div className="sub-text py-2">
          {publisherData?.organization_email || "..."}
        </div>
      </>
      <Divider className="mt-1" />

      <>
        <div>
          <div className="sub-section-title ">
            {localeString(language, "publisherName")}
          </div>
          <div className="sub-text py-2">{publisherData?.name || "..."}</div>
        </div>
        <Divider className="mt-1" />
      </>
      <>
        <div>
          <div className="sub-section-title ">
            {localeString(language, "regPhoneNumber")}
          </div>
          <div className="sub-text py-2">
            {publisherData?.publisher_phone || "..."}
          </div>
        </div>
        <div className=" pb-3 text-library-primary text-xs font-normal">
          {localeString(language, "youCanNotChangeThisPhoneNumber")}
        </div>
        <Divider className="mt-1" />
      </>
      <>
        <div>
          <div className="sub-section-title ">
            {localeString(language, "authorNamePersonalAuthor")}
          </div>
          <span className="sub-text py-2">
            {publisherData?.author_name || "..."}
          </span>
        </div>
        <Divider className="mt-1" />
      </>

      <div>
        <div className="sub-section-title ">
          {localeString(language, "address")}
        </div>
        <div className="sub-text py-2">{publisherData?.address || "..."}</div>
      </div>
    </div>
  );
};
