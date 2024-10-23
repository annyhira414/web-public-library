import {
  Address,
  ChildMembershipInformation,
  ParentDetails,
  PersonalInformation,
} from "@/components/membership";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getData, postData, updateData } from "@/lib/services";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  filterFalsyValues,
  localeString,
  objectToFormData,
  scrollToTop,
} from "@/lib/helpers/utils";
import { ChildSchoolDetails } from "@/components/membership/ChildSchoolDetails";
import moment from "moment";
import { Button, message } from "antd";
type Inputs = {};

const ChildMembership = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { membershipType, mode } = router?.query;
  const [userDetails, setUserDetails] = useState<any>();
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const name = Cookies.get("fullName");
  const phone = Cookies.get("phone");
  const email = Cookies.get("email");
  const gender = Cookies.get("gender");
  const dob = Cookies.get("dob");
  const mySchema = memberSchema(language);
  const myUpdateSchema = memberUpdateSchema(language);

  const method = useForm<any>({
    defaultValues: {
      fullName: name,
      phone: phone,
      email: email,
      gender: gender,
      dob: new Date(dob as string),
      fatherName: "",
      motherName: "",
      preDivision: null,
      preDistrict: null,
      preThana: null,
      preAddressLine: "",
      perDivision: null,
      perDistrict: null,
      perThana: null,
      perAddressLine: "",
      baseLibrary: null,
      documentType: null,
      identityNumber: "",
      proPic: "",
      birthCertificateImage: "",
      schoolName: "",
      membership_category: "",
      proPicFetch: "",
      birthCertificateFetch: "",
    },
    mode: "all",
    resolver: zodResolver(mode === "edit" ? myUpdateSchema : mySchema),
  });
  const {
    handleSubmit,
    setValue,
    formState: { isDirty, isValid, errors, isSubmitting },
  } = method;

  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);

  const handleNextButton = () => {
    setSecondPage(true);
    window.scrollTo(0, 0);
    setFirstPage(false);
  };
  const handlePreviousButton = () => {
    setSecondPage(false);
    scrollToTop();
    setFirstPage(true);
  };
  useEffect(() => {
    if (mode === "edit") {
      getMembershipDetails();
    }
  }, []);
  const getMembershipDetails = async () => {
    const res = await getData(
      `public_library/membership_requests/details`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setValue("fatherName", res?.data?.request_detail?.father_Name);
      setValue("motherName", res?.data?.request_detail?.mother_name);
      setValue("preDivision", res?.data?.request_detail?.present_division?.id);
      setValue("preDistrict", res?.data?.request_detail?.present_district?.id);
      setValue("preThana", res?.data?.request_detail?.present_thana?.id);
      setValue("preAddressLine", res?.data?.request_detail?.present_address);
      setValue(
        "perDivision",
        res?.data?.request_detail?.permanent_division?.id
      );
      setValue(
        "perDistrict",
        res?.data?.request_detail?.permanent_district?.id
      );
      setValue("perThana", res?.data?.request_detail?.permanent_thana?.id);
      setValue("perAddressLine", res?.data?.request_detail?.permanent_address);
      setValue("baseLibrary", res?.data?.request_detail?.library?.id);
      setValue("documentType", res?.data?.request_detail?.identity_type);
      setValue("identityNumber", res?.data?.request_detail?.identity_number);
      setValue("proPicFetch", res?.data?.request_detail?.images?.profile_image);
      setValue(
        "birthCertificateFetch",
        res?.data?.request_detail?.images?.birth_certificate_image
      );
      setValue("schoolName", res?.data?.request_detail?.institute_name);
    }
  };
  const onSubmit = async (data: any) => {
    let birthDate = moment(data?.dob).format("YYYY-MM-DD");
    let phone = "";
    if (data.phone.startsWith("+88")) {
      phone = data.phone.slice(2);
    } else {
      phone = data.phone;
    }
    const params = {
      request_detail_attributes: {
        full_name: data?.fullName,
        phone: phone,
        email: data?.email,
        gender: data?.gender,
        dob: birthDate,
        father_Name: data?.fatherName,
        mother_name: data?.motherName,
        identity_type: data?.documentType,
        identity_number: data?.identityNumber,
        present_address: data?.preAddressLine,
        present_division_id: data?.preDivision,
        present_district_id: data?.preDistrict,
        present_thana_id: data?.preThana,
        permanent_address: data?.perAddressLine,
        permanent_division_id: data?.perDivision,
        permanent_district_id: data?.perDistrict,
        permanent_thana_id: data?.perThana,
        library_id: data?.baseLibrary,
        birth_certificate_image_file:
          data?.documentType === "birth_certificate"
            ? data?.birthCertificateImage.file
            : null,
        institute_name: data?.schoolName,
        membership_category: membershipType,
      },
    };
    const newData = filterFalsyValues(params?.request_detail_attributes);
    const formData = objectToFormData({ request_detail_attributes: newData });

    if (mode === "edit") {
      const res = await updateData(
        `public_library/membership_requests/update`,
        formData,
        "",
        userToken
      );
      if (res?.success) {
        router.push("/membership/successful-submit");
      } else {
        errorMsg("Please Fill up all Required Field");
      }
    } else {
      const res = await postData(
        `public_library/membership_requests`,
        formData,
        language,
        userToken
      );
      if (res?.success) {
        router.push("/membership/successful-submit");
      } else {
        errorMsg("Please Fill up all Required Field");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="pl-content-container mb-12">
        <div className="membership-heading">
          <h1 className="font-bold font-playfairDisplay text-grey-1000 text-center text-3xl py-9">
            {localeString(language, "childMember")}
          </h1>
        </div>

        <FormProvider {...method}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${firstPage ? "block" : "hidden"}`}>
              <PersonalInformation />
              <ParentDetails />
              <Address />
              <div className="borrowBookButton flex justify-end  my-3">
                <Button
                  className="button-secondary h-9 px-6 flex items-center"
                  onClick={handleNextButton}
                >
                  {localeString(language, "nextbtn")}
                  <span className="inline-block ml-2">
                    <IoMdArrowForward />
                  </span>
                </Button>
              </div>
            </div>

            <div className={`${secondPage ? "block" : "hidden"}`}>
              <ChildMembershipInformation />
              <ChildSchoolDetails />
              <div className="borrowBookButton flex justify-between my-3">
                <Button
                  className="button-secondary h-9 px-6 flex items-center"
                  onClick={handlePreviousButton}
                >
                  <span className=" inline-block mr-2">
                    <IoArrowBackOutline />
                  </span>
                  {localeString(language, "previousBtn")}
                </Button>

                <Button
                  className="button-secondary h-9 px-12"
                  htmlType="submit"
                >
                  {localeString(language, "submit")}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ChildMembership;

const memberSchema = (language: string | undefined) => {
  return Z.object({
    fullName: Z.string({
      required_error: localeString(language, "fullNameRequired"),
    }).min(1, {
      message: `${localeString(language, "fullNameRequired")}`,
    }),
    phone: Z.string({
      required_error: localeString(language, "phoneNoRequired"),
    })
      .min(11, {
        message: `${localeString(language, "phoneNoRequired")}`,
      })
      .max(11),
    email: Z.string({ required_error: localeString(language, "emailRequired") })
      .email({
        message: `${localeString(language, "emailRequired")}`,
      })
      .optional(),
    gender: Z.string({
      required_error: localeString(language, "genderRequired"),
      invalid_type_error: localeString(language, "genderRequired"),
    }),
    dob: Z.date({
      invalid_type_error: localeString(language, "dobRequired"),
    }).refine((val) => val !== null, {
      message: localeString(language, "dobRequired"),
    }),
    fatherName: Z.string({
      required_error: localeString(language, "fatherNameRequired"),
      invalid_type_error: localeString(language, "fatherNameRequired"),
    }),
    motherName: Z.string({
      required_error: localeString(language, "motherNameRequired"),
      invalid_type_error: localeString(language, "motherNameRequired"),
    }),
    preDivision: Z.number({
      required_error: localeString(language, "presentDivision"),
      invalid_type_error: localeString(language, "presentDivision"),
    }),
    preDistrict: Z.number({
      required_error: localeString(language, "presentDistrict"),
      invalid_type_error: localeString(language, "presentDistrict"),
    }),
    preThana: Z.number({
      required_error: localeString(language, "presentThana"),
      invalid_type_error: localeString(language, "presentThana"),
    }),
    preAddressLine: Z.string({
      required_error: localeString(language, "presentAddressLine"),
      invalid_type_error: localeString(language, "presentAddressLine"),
    }),
    perDivision: Z.number({
      required_error: localeString(language, "permanentDivision"),
      invalid_type_error: localeString(language, "permanentDivision"),
    }),
    perDistrict: Z.number({
      required_error: localeString(language, "permanentDistrict"),
      invalid_type_error: localeString(language, "permanentDistrict"),
    }),
    perThana: Z.number({
      required_error: localeString(language, "permanentThana"),
      invalid_type_error: localeString(language, "permanentThana"),
    }),
    perAddressLine: Z.string({
      required_error: localeString(language, "permanentAddressLine"),
      invalid_type_error: localeString(language, "permanentAddressLine"),
    }),
    baseLibrary: Z.number({
      required_error: localeString(language, "baseLibraryRequired"),
      invalid_type_error: localeString(language, "baseLibraryRequired"),
    }),
    documentType: Z.string({
      required_error: localeString(language, "documentTypeRequired"),
      invalid_type_error: localeString(language, "documentTypeRequired"),
    }),
    identityNumber: Z.string({
      required_error: localeString(language, "identityNumberRequired"),
      invalid_type_error: localeString(language, "identityNumberRequired"),
    }),
    proPic: Z.any().optional(),
    nidFrontImage: Z.any().optional(),
    nidBackImage: Z.any().optional(),
    birthCertificateImage: Z.any().optional(),
    schoolName: Z.string().optional(),
  }).refine(
    (data) => {
      if (data?.documentType === "birth_certificate") {
        return data?.birthCertificateImage?.fileList?.length === 1;
      }
      return true;
    },
    {
      message: localeString(language, "birthCertificateRequired"),
      path: ["birthCertificateImage"],
    }
  );
};
const memberUpdateSchema = (language: string | undefined) => {
  return Z.object({
    fullName: Z.string({
      required_error: localeString(language, "fullNameRequired"),
    }).min(1, {
      message: localeString(language, "fullNameRequired"),
    }),
    phone: Z.string({
      required_error: localeString(language, "phoneNoRequired"),
    })
      .min(11, {
        message: localeString(language, "phoneNoRequired"),
      })
      .max(11),
    email: Z.string({ required_error: localeString(language, "emailRequired") })
      .email({
        message: localeString(language, "emailRequired"),
      })
      .optional(),
    gender: Z.string({
      required_error: localeString(language, "genderRequired"),
      invalid_type_error: localeString(language, "genderRequired"),
    }),
    dob: Z.date({
      invalid_type_error: localeString(language, "dobRequired"),
    }).refine((val) => val !== null, {
      message: localeString(language, "dobRequired"),
    }),
    fatherName: Z.string({
      required_error: localeString(language, "fatherNameRequired"),
      invalid_type_error: localeString(language, "fatherNameRequired"),
    }),
    motherName: Z.string({
      required_error: localeString(language, "motherNameRequired"),
      invalid_type_error: localeString(language, "motherNameRequired"),
    }),
    preDivision: Z.number({
      required_error: localeString(language, "presentDivision"),
      invalid_type_error: localeString(language, "presentDivision"),
    }),
    preDistrict: Z.number({
      required_error: localeString(language, "presentDistrict"),
      invalid_type_error: localeString(language, "presentDistrict"),
    }),
    preThana: Z.number({
      required_error: localeString(language, "presentThana"),
      invalid_type_error: localeString(language, "presentThana"),
    }),
    preAddressLine: Z.string({
      required_error: localeString(language, "presentAddressLine"),
      invalid_type_error: localeString(language, "presentAddressLine"),
    }),
    perDivision: Z.number({
      required_error: localeString(language, "permanentDivision"),
      invalid_type_error: localeString(language, "permanentDivision"),
    }),
    perDistrict: Z.number({
      required_error: localeString(language, "permanentDistrict"),
      invalid_type_error: localeString(language, "permanentDistrict"),
    }),
    perThana: Z.number({
      required_error: localeString(language, "permanentThana"),
      invalid_type_error: localeString(language, "permanentThana"),
    }),
    perAddressLine: Z.string({
      required_error: localeString(language, "permanentAddressLine"),
      invalid_type_error: localeString(language, "permanentAddressLine"),
    }),
    baseLibrary: Z.number({
      required_error: localeString(language, "baseLibraryRequired"),
      invalid_type_error: localeString(language, "baseLibraryRequired"),
    }),
    documentType: Z.string({
      required_error: localeString(language, "documentTypeRequired"),
      invalid_type_error: localeString(language, "documentTypeRequired"),
    }),
    identityNumber: Z.string({
      required_error: localeString(language, "identityNumberRequired"),
      invalid_type_error: localeString(language, "identityNumberRequired"),
    }),
    proPic: Z.any().optional(),
    birthCertificateImage: Z.any().optional(),
    profession: Z.string().optional(),
    organizationName: Z.string().optional(),
    organizationAddress: Z.string().optional(),
  });
};
