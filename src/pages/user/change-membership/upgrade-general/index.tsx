import {
  GeneralMemberInformation,
  ProfesionalDetails,
} from "@/components/membership";
import {
  filterFalsyValues,
  localeString,
  objectToFormData,
} from "@/lib/helpers/utils";
import { postData } from "@/lib/services";
import { Button, message } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type Inputs = {
  membershipRadio: string;
};

const UpgradeToGeneral = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const mySchema = memberSchema(language);

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const method = useForm<any>({
    defaultValues: {
      baseLibrary: null,
      documentType: null,
      identityNumber: "",
      nidFrontImage: "",
      nidBackImage: "",
      birthCertificateImage: "",
      schoolName: "",
      membership_category: "",
    },
    mode: "all",
    resolver: zodResolver(mySchema),
  });
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = method;
  const { membershipType } = router?.query;
  const handlePreviousButton = () => {
    router.push("/user/change-membership");
  };
  const onSubmit = async (data: any) => {
    const params = {
      request_detail_attributes: {
        library_id: data?.baseLibrary,
        identity_type: data?.documentType,
        identity_number: data?.identityNumber,
        nid_front_image_file:
          data?.documentType === "nid" ? data?.nidFrontImage.file : null,
        nid_back_image_file:
          data?.documentType === "nid" ? data?.nidBackImage.file : null,

        birth_certificate_image_file:
          data?.documentType === "birth_certificate"
            ? data?.birthCertificateImage.file
            : null,
        profession: data?.profession,
        institute_name: data?.organizationName,
        institute_address: data?.organizationAddress,
        membership_category: membershipType,
      },
    };
    const newData = filterFalsyValues(params?.request_detail_attributes);
    const formData = objectToFormData({ request_detail_attributes: newData });

    const res = await postData(
      `public_library/membership_requests/upgrade`,
      formData,
      language,
      userToken
    );
    if (res?.success) {
      router.push("/membership/successful-submit");
    } else {
      errorMsg("Please Fill up all Required Field");
    }
  };
  return (
    <div className="pl-content-container mt-6">
      {contextHolder}
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GeneralMemberInformation />
          <ProfesionalDetails />
          <div className="membership-submit-btn flex justify-between my-3">
            <Button
              className="bg-library-primary px-6  rounded text-white flex items-center"
              onClick={handlePreviousButton}
            >
              <span className="inline-block mr-2">
                <IoArrowBackOutline />
              </span>
              {localeString(language, "previousBtn")}
            </Button>

            <Button
              className="bg-library-primary px-12 rounded text-white "
              disabled={!isDirty || !isValid || isSubmitting}
              htmlType="submit"
            >
              {localeString(language, "submit")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpgradeToGeneral;

const memberSchema = (language: string | undefined) => {
  return Z.object({
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

    nidFrontImage: Z.any().optional(),
    nidBackImage: Z.any().optional(),
    birthCertificateImage: Z.any().optional(),
    profession: Z.string({
      required_error: localeString(language, "professionRequired"),
      invalid_type_error: localeString(language, "professionRequired"),
    }),
    organizationName: Z.string({
      required_error: localeString(language, "Institution Name is Required"),
      invalid_type_error: localeString(
        language,
        "Institution Name is Required"
      ),
    }),
    organizationAddress: Z.string({
      required_error: localeString(language, "Institution Address is Required"),
      invalid_type_error: localeString(
        language,
        "Institution Address is Required"
      ),
    }),
  })

    .refine(
      (data) => {
        if (data?.documentType === "birth_certificate") {
          return data?.birthCertificateImage?.fileList?.length === 1;
        }
        return true;
      },
      {
        message: "Birth Certificate is required",
        path: ["birthCertificateImage"],
      }
    )

    .refine(
      (data) => {
        if (data?.documentType === "nid") {
          return data?.nidFrontImage?.fileList?.length === 1;
        }
        return true;
      },
      {
        message: "NID Front image is required",
        path: ["nidFrontImage"],
      }
    )

    .refine(
      (data) => {
        if (data?.documentType === "nid") {
          return data?.nidBackImage?.fileList?.length === 1;
        }
        return true;
      },
      {
        message: "NID Back image is required",
        path: [" nidBackImage"],
      }
    );
};
