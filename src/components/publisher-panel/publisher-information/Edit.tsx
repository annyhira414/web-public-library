import React, {FC, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import {useFormContext} from "react-hook-form";
import {Button} from "antd";
import Cookies from "js-cookie";
import {IPublicationDetails} from "@/lib/model/publisher";

interface IEditProps {
  publisherData: IPublicationDetails | undefined;
  onCancel: () => void;
}

export const Edit: FC<IEditProps> = ({publisherData, onCancel}) => {
  const language: string | undefined = Cookies.get("language");

  const {
    register,
    formState: {errors},
  } = useFormContext();

  const [updateNameOrganization, setUpdateNameOrganization] = useState(
    publisherData?.publication_name
  );

  const handleNameChangeOrganization = (e: any) => {
    const updateOrganizationName = e.target.value;
    setUpdateNameOrganization(updateOrganizationName);
  };

  const [updateOrganizationPhone, setUpdateOrganizationPhone] = useState(
    publisherData?.organization_phone
  );

  const handlePhoneChange = (e: any) => {
    const updatedPhone = e.target.value;
    setUpdateOrganizationPhone(updatedPhone);
  };

  const [updateOrganizationEmail, setUpdateOrganizationEmail] = useState(
    publisherData?.organization_email
  );

  const handleEmailChange = (e: any) => {
    const updatedEmail = e.target.value;
    setUpdateOrganizationEmail(updatedEmail != null ? updatedEmail : "");
  };
  const [updatePublisherName, setUpdatePublisherName] = useState(
    publisherData?.name
  );

  const handlePublisherNameChange = (e: any) => {
    const updatedPublisherName = e.target.value;
    setUpdatePublisherName(
      updatedPublisherName !== null ? updatedPublisherName : ""
    );
  };
  const [updateAuthorName, setUpdateAuthorName] = useState(
    publisherData?.author_name
  );

  const handleAuthorNameChange = (e: any) => {
    const updatedAuthorName = e.target.value;
    setUpdateAuthorName(updatedAuthorName);
  };
  const [updateAddress, setUpdateAddress] = useState(publisherData?.address);

  const handleAddressChange = (e: any) => {
    const updatedAddress = e.target.value;
    setUpdateAddress(updatedAddress);
  };

  return (
    <>
      <div className="bg-white">
        <>
          <fieldset className="px-4 pr-32 border border-library-primary rounded">
            <legend className="px-1">
              {localeString(language, "publicationOrganizationName")} :
            </legend>
            <div className="inputStyle">
              <input
                value={updateNameOrganization}
                {...register("publication_name")}
                className="py-4"
                onChange={handleNameChangeOrganization}
              />
            </div>
            <div className="">
              {errors?.publication_name && (
                <p className="text-red-500">
                  {(errors.publication_name as any)?.message}
                </p>
              )}
            </div>
          </fieldset>
        </>
        <div className="pt-8">
          <fieldset className="px-4 border border-library-primary rounded">
            <legend className="px-1">
              {localeString(language, "publicationOrganizationPhoneNumber")}:
            </legend>
            <div className="inputStyle">
              <input
                value={updateOrganizationPhone}
                {...register("organization_phone")}
                className="py-4"
                onChange={handlePhoneChange}
              />
              {errors?.organization_phone && (
                <p className="text-red-500">
                  {(errors.organization_phone as any)?.message}
                </p>
              )}
            </div>
          </fieldset>
        </div>
        <div className="pt-8">
          <fieldset className="px-4  border border-library-primary rounded">
            <legend className="px-1">
              {localeString(language, "publicationOrganizationEmailAddress")}:
            </legend>
            <div className="inputStyle">
              <input
                value={updateOrganizationEmail}
                {...register("organization_email")}
                className="py-4"
                onChange={handleEmailChange}
              />
              {errors?.organization_email && (
                <p className="text-red-500">
                  {(errors.organization_email as any)?.message}
                </p>
              )}
            </div>
          </fieldset>
        </div>
        <div className="pt-8">
          <fieldset className="px-4 border border-library-primary rounded">
            <legend className="px-1">
              {localeString(language, "publisherName")} :{" "}
            </legend>
            <div className="inputStyle">
              <input
                value={updatePublisherName}
                {...register("name")}
                className="py-4"
                onChange={handlePublisherNameChange}
              />
              {errors?.name && (
                <p className="text-red-500">{(errors.name as any)?.message}</p>
              )}
            </div>
          </fieldset>
        </div>
        <div className="pt-8 text-gray-400">
          <div className="px-1 text-sm font-bold">
            {localeString(language, "publisherMobileNumber")} :
          </div>
          <div className="pt-2 pl-1">{publisherData?.publisher_phone}</div>
        </div>
        <div className="pt-8">
          <fieldset className="px-4 border border-library-primary rounded">
            <legend className="px-1">
              {localeString(language, "authorNamePersonalAuthor")} :
            </legend>
            <div className="inputStyle">
              <input
                value={updateAuthorName}
                {...register("author_name")}
                className="py-4"
                onChange={handleAuthorNameChange}
              />
              {errors?.author_name && (
                <p className="text-red-500">
                  {(errors.author_name as any)?.message}
                </p>
              )}
            </div>
          </fieldset>
        </div>
        <div className="pt-8">
          <fieldset className="px-4 pr-8 border border-library-primary rounded">
            <legend className="px-1">
              {localeString(language, "address")} :
            </legend>
            <div className="inputStyle">
              <input
                value={updateAddress}
                {...register("address")}
                className="py-4"
                onChange={handleAddressChange}
              />
              {errors?.address && (
                <p className="text-red-500">
                  {(errors.address as any)?.message}
                </p>
              )}
            </div>
          </fieldset>
        </div>

        <div className="flex justify-start my-8 gap-4">
          <div className="bookButton">
            <Button className="button-primary  w-36 h-12" onClick={onCancel}>
              {localeString(language, "cancelBtn")}
            </Button>
          </div>
          <div className="borrowBookButton">
            <Button htmlType="submit" className="button-secondary  w-36 h-12">
              {localeString(language, "saveBtn")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
