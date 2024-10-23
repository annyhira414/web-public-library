import {localeString} from "@/lib/helpers/utils";
import {Input, FieldLabel} from "@/components/controls";
import Cookies from "js-cookie";
import React, {FC} from "react";
import {useFormContext} from "react-hook-form";

interface IRegisterForm {}
export const RegisterForm: FC<IRegisterForm> = () => {
  const language = Cookies.get("language");
  const {
    control,
    watch,
    formState: {errors},
  } = useFormContext();

  return (
    <div className="border shadow-sm shadow-pl-box-shadow p-6">
      <div className="">
        <FieldLabel
          required
          className={`text-sm font-normal`}
          name="publicationOrganizationName"
          label={localeString(language, "publicationOrganizationName")}
        />
        <Input
          name="publicationOrganizationName"
          control={control}
          placeholder={localeString(language, "publicationOrganizationName")}
          errors={errors}
          className="mb-2 borde rounded-md mt-2 bg-gray-color border-book-input-color"
        />
      </div>
      <div className="">
        <FieldLabel
          className={`text-sm font-normal`}
          name="publicationOrganizationPhoneNumber"
          label={localeString(language, "publicationOrganizationPhoneNumber")}
        />
        <Input
          name="publicationOrganizationPhoneNumber"
          control={control}
          placeholder={localeString(
            language,
            "publicationOrganizationPhoneNumber"
          )}
          errors={errors}
          className="mb-2 borde rounded-md mt-2 bg-gray-color border-book-input-color"
        />
      </div>
      <div className="">
        <FieldLabel
          className={`text-sm font-normal`}
          name="publicationOrganizationEmailAddress"
          label={localeString(language, "publicationOrganizationEmailAddress")}
        />
        <Input
          name="publicationOrganizationEmailAddress"
          control={control}
          placeholder={localeString(
            language,
            "publicationOrganizationEmailAddress"
          )}
          errors={errors}
          className="mb-2 borde rounded-md mt-2 bg-gray-color border-book-input-color"
        />
      </div>
      <div className="">
        <FieldLabel
          className="text-sm font-normal"
          name="publisherName"
          label={localeString(language, "publisherName")}
        />
        <Input
          name="publisherName"
          control={control}
          placeholder={localeString(language, "publisherName")}
          errors={errors}
          className="mb-2 borde rounded-md mt-2 bg-gray-color border-book-input-color"
        />
      </div>

      <div>
        <FieldLabel
          className="text-sm font-normal"
          name="publisherMobileNumber"
          label={localeString(language, "publisherMobileNumber")}
        />
        <Input
          readOnly={true}
          name="publisherMobileNumber"
          control={control}
          placeholder={localeString(language, "publisherMobileNumber")}
          errors={errors}
          className="mb-2 borde rounded-md mt-2 bg-gray-color border-book-input-color"
        />
        <div className=" pb-3 text-library-primary text-xs font-normal">
          {localeString(language, "youCanNotChangeThisPhoneNumber")}
        </div>
      </div>

      <div className="">
        <FieldLabel
          className="text-sm font-normal"
          name="authorName"
          label={localeString(language, "authorNamePersonalAuthor")}
        />
        <Input
          name="authorName"
          control={control}
          placeholder={localeString(language, "authorName")}
          errors={errors}
          className="mb-2 borde rounded-md mt-2 bg-gray-color border-book-input-color"
        />
      </div>
      <div className="">
        <FieldLabel
          required
          className="text-sm font-normal"
          name="address"
          label={localeString(language, "address")}
        />
        <Input
          name="address"
          control={control}
          placeholder={localeString(language, "address")}
          errors={errors}
          className="mb-2 borde rounded-md mt-2 bg-gray-color border-book-input-color"
        />
      </div>
    </div>
  );
};
