import React, {FC} from "react";
import {Input, Select} from "@/components/controls";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button, message, Checkbox} from "antd";
import type {CheckboxChangeEvent} from "antd/es/checkbox";
import {ID} from "@/lib/constants";
import {getData} from "@/lib/services";
import {useRouter} from "next/router";
import * as y from "yup";
import Cookies from "js-cookie";
import {postData} from "@/lib/services";
import {ToastContainer, toast} from "react-toastify";
import {localeString} from "@/lib/helpers/utils";
import {yupResolver} from "@hookform/resolvers/yup";
import {IForm, IOption} from "@/lib/model/events";
import {IEventDetails} from "@/lib/model/activities/eventDetails";

import "react-toastify/dist/ReactToastify.css";
interface IEventDetailsProps {
  eventDetails: IEventDetails;
  language: string;
  slug: string | string[] | undefined;
  registration_fields: string[];
  setLibrary: any;
}

const EventRegisterForm: FC<IEventDetailsProps> = ({
  language,
  registration_fields,
  slug,
  setLibrary,
}) => {
  // console.log("fffff", registration_fields);
  const object: any = {
    code: y
      .string()
      .typeError("Library Code is required")
      .required("Library Code is required")
      .trim(),
  };

  if (registration_fields) {
    for (const item of registration_fields) {
      if (item === "name") {
        object.name = y
          .string()
          .typeError("Full Name is required")
          .required("Full Name is required")
          .trim();
      } else if (item === "phone") {
        object.phone = y
          .string()
          .typeError("Phone number is required")
          .required("Phone number is required")
          .matches(
            /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
            "Provide valid BD phone number in English"
          );
      } else if (item === "father_name") {
        object.father = y
          .string()
          .typeError("Father's Name is required")
          .required("Father's Name is required")
          .trim();
      } else if (item === "mother_name") {
        object.mother = y
          .string()
          .typeError("Mother's Name is required")
          .required("Mother's Name is required")
          .trim();
      } else if (item === "email") {
        object.email = y
          .string()
          .typeError("Email is required")
          .required("Email is required")
          .trim();
      } else if (item === "address") {
        object.address = y
          .string()
          .typeError("Contact Address is required")
          .required("Contact Address is required")
          .trim();
      } else if (item === "profession") {
        object.profession = y
          .string()
          .typeError("Profession is required")
          .required("Profession is required")
          .trim();
      } else if (item === "identity_type") {
        object.idType = y
          .string()
          .typeError("Document Type is required")
          .required("Document Type is required")
          .trim();
      } else if (item === "identity_number") {
        object.nid = y
          .string()
          .typeError("NID/Birth Registration No. is required")
          .required("NID/Birth Registration No. is required")
          .trim();
      }
    }
  }

  const RegisterSchema = y.object().shape(object);

  const [event, setEvent] = useState<IForm>();
  const [isOkDisabled, setIsOkDesabled] = useState<boolean>(false);
  const [option, setOption] = useState<IOption[]>([]);
  const lang = Cookies.get("language");
  const router = useRouter();

  useEffect(() => {
    getEvent();
    // getLibrary();
  }, []);

  const getEvent = async () => {
    const response = await getData(
      `/public_library/events/${slug}/event_libraries`,
      {},
      lang
    );
    if (response?.success) {
      setEvent(response?.data);
      const options = response?.data?.map((item: IOption) => {
        return {
          id: item?.id,
          value: item?.code,
          label: item?.name,
        };
      });
      setOption(options);
    }
  };
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<any>({
    defaultValues: {
      code: null,
      name: "",
      phone: "",
      email: "",
      father_name: "",
      mother_name: "",
      address: "",
      profession: "",
      identity_number: "",
      identity_type: "",
      termsAndConditions: false,
    },
    mode: "all",
    resolver: yupResolver(RegisterSchema),
  });

  const watchCode = watch("code");

  useEffect(() => {
    getLibrary();
  }, [watchCode]);

  const getLibrary = async () => {
    const res = await getData(
      `/public_library/libraries/${watchCode}`,
      {},
      lang
    );
    if (res?.success) {
      setLibrary(res?.data);
    }
  };

  const onSubmit = async (data: any) => {
    if (isOkDisabled) {
      let phone = "";
      if (data.phone.startsWith("+88")) {
        phone = data.phone.slice(2) || null;
      } else {
        phone = data.phone || null;
      }

      const formData = {
        name: data.name || null,
        phone,
        email: data.email || null,
        identity_number: data.nid || null,
        identity_type: data.idType || null,
        father_name: data.father || null,
        mother_name: data.mother || null,
        profession: data.profession || null,
        address: data.address || null,
      };
      const res = await postData(
        `/public_library/events/${slug}/register`,
        {library_code: data.code || null, registration_fields: formData},
        language,
        Cookies.get("token")
      );
      if ([200, 201].includes(res.data?.status)) {
        router.push("/activities/events");
      } else {
        if (res.status?.status === 401) {
          router.push("/auth/login");
        }
      }
    } else {
      toast.info("Terms & Conditions is not checked");
    }
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setIsOkDesabled(e.target.checked);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {registration_fields?.length &&
            registration_fields?.map((item: any, i: number, arr: any) => {
              return (
                <div key={i}>
                  {arr[i] == "name" && (
                    <Input
                      name="name"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationName"
                      )}
                      className="h-10 mb-1"
                    />
                  )}

                  {arr[i] === "phone" && (
                    <Input
                      name="phone"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationPhone"
                      )}
                      className="h-10 mb-1 mt-4"
                    />
                  )}

                  {arr[i] === "identity_type" && (
                    <Select
                      name="idType"
                      control={control}
                      errors={errors}
                      options={ID}
                      placeholder={localeString(
                        language,
                        "eventRegistrationIdtype"
                      )}
                      className=" mb-1 h-10 mt-4"
                    />
                  )}
                  {arr[i] === "identity_number" && (
                    <Input
                      name="nid"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationNumber"
                      )}
                      className="h-10 mb-1 mt-4"
                    />
                  )}
                  {arr[i] === "email" && (
                    <Input
                      name="email"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationEmail"
                      )}
                      className="h-10 mb-1 mt-4"
                    />
                  )}
                  {arr[i] === "father_name" && (
                    <Input
                      name="father"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationFather"
                      )}
                      className="h-10 mb-1 mt-4"
                    />
                  )}
                  {arr[i] === "mother_name" && (
                    <Input
                      name="mother"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationMother"
                      )}
                      className="h-10 mb-1 mt-4"
                    />
                  )}

                  {arr[i] === "address" && (
                    <Input
                      name="address"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationContact"
                      )}
                      className="h-10 mb-1 mt-4"
                    />
                  )}
                  {arr[i] === "profession" && (
                    <Input
                      name="profession"
                      control={control}
                      errors={errors}
                      placeholder={localeString(
                        language,
                        "eventRegistrationProfession"
                      )}
                      className="h-10 mb-1 mt-4"
                    />
                  )}
                </div>
              );
            })}
          <Select
            name="code"
            control={control}
            errors={errors}
            options={option}
            placeholder={localeString(language, "EnterLibrarySelect")}
            className="h-12 mt-4"
          />
          <div className="my-8">
            <Checkbox onChange={onChange}>
              {localeString(language, "eventRegistrationTerms")}
              {localeString(language, "eventRegistrationCondition")}
            </Checkbox>
          </div>
          <div className="mt-12 borrowBookButton">
            <Button
              disabled={!isDirty || !isValid || isSubmitting || !isOkDisabled}
              className="w-full button-secondary h-12"
              htmlType="submit"
            >
              {localeString(language, "eventRegistrationButton")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default EventRegisterForm;
// const RegisterSchema = y.object().shape({
//   code: y
//     .string()
//     .typeError("Library Code is required")
//     .required("Library Code is required")
//     .trim(),

//   name: y
//     .string()
//     .typeError("Full Name is required")
//     .required("Full Name is required")
//     .trim(),

//   phone: y
//     .string()
//     .typeError("Phone number is required")
//     .required("Phone number is required")
//     .matches(
//       /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
//       "Provide valid BD phone number in English"
//     ),
//   father: y
//     .string()
//     .typeError("Father's Name is required")
//     .required("Father's Name is required")
//     .trim(),
//   mother: y
//     .string()
//     .typeError("Mother's Name is required")
//     .required("Mother's Name is required")
//     .trim(),
//   email: y
//     .string()
//     .typeError("Email is required")
//     .required("Email is required")
//     .trim(),
//   address: y
//     .string()
//     .typeError("Contact Address is required")
//     .required("Contact Address is required")
//     .trim(),
//   profession: y
//     .string()
//     .typeError("Profession is required")
//     .required("Profession is required")
//     .trim(),
//   idType: y
//     .string()
//     .typeError("Document Type is required")
//     .required("Document Type is required")
//     .trim(),
//   nid: y
//     .string()
//     .typeError("NID/Birth Registration No. is required")
//     .required("NID/Birth Registration No. is required")
//     .trim(),
// });
