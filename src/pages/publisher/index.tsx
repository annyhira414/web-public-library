import React, {FC} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {IPublisherData} from "@/lib/model/publisher";
import {Button, Col, Row, message} from "antd";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {postData} from "@/lib/services";
import {useRouter} from "next/router";
import {filterFalsyValues} from "@/lib/helpers/utils";
import {RegisterForm} from "@/components/publisher";

interface IPublisherRegistration {}
const PublisherRegistration: FC<IPublisherRegistration> = ({}) => {
  const language = Cookies.get("language");
  const [messageApi, contextHolder] = message.useMessage();
  let router = useRouter();

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const Schema = schema(language);

  const method = useForm<IPublisherData>({
    defaultValues: {
      publicationOrganizationName: "",
      publicationOrganizationPhoneNumber: null,
      publicationOrganizationEmailAddress: null,
      publisherName: "",
      publisherMobileNumber: Cookies.get("phone"),
      authorName: "",
      address: "",
    },
    mode: "all",
    resolver: zodResolver(Schema),
  });
  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {isSubmitting, isDirty, isValid},
  } = method;

  const onSubmit = async (data: IPublisherData) => {
    let params = {
      publication_name: data?.publicationOrganizationName,
      organization_phone: data?.publicationOrganizationPhoneNumber,
      organization_email: data?.publicationOrganizationEmailAddress,
      name: data?.publisherName,
      publisher_phone: data?.publisherMobileNumber,
      author_name: data?.authorName,
      address: data?.address,
    };
    params = filterFalsyValues(params);

    const res: any = await postData(
      `public_library/publishers`,
      params,
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      successMsg("Request Successfull");
      Cookies.set("is_publisher", res?.data?.is_publisher);
      router.push("/publisher/successful");
    } else {
      errorMsg(res?.data?.error);
    }
    console.log("res?.data?.is_publisher", res?.data?.is_publisher);
  };

  return (
    <div className="pb-20 pl-content-container">
      {contextHolder}
      <div className="pt-10 section-title-dark">
        {localeString(language, "publisherRegistration")}
      </div>

      <div className="bg-white py-6  border-t-4 border-library-primary rounded-b-lg">
        <div className="py-6 px-16">
          <>
            <Row gutter={[16, 25]}>
              <Col
                xs={{span: 24}}
                sm={{span: 24}}
                md={{span: 12}}
                lg={{span: 12}}
                xl={{span: 12}}
              >
                <div className="pr-0 lg:pr-8">
                  <div className="py-2 min-section-title ">
                    {localeString(language, "basicInfromation")}
                  </div>
                  <div>
                    {/* need some text */}
                    {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nulla deserunt, itaque quibusdam consequatur */}
                  </div>
                  <div className="pt-4">
                    {/* <span>NB:</span> */}
                    <span className="pl-2">
                      {/* quasi earum saepe et odio porro quod reiciendis dolore
                      consequuntur voluptatibus quisquam accusamus veniam
                      repellat ullam odit! */}
                    </span>
                  </div>
                </div>
              </Col>
              <Col
                xs={{span: 24}}
                sm={{span: 24}}
                md={{span: 12}}
                lg={{span: 12}}
                xl={{span: 12}}
              >
                <FormProvider {...method}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <RegisterForm />
                    <div className="w-full pt-4">
                      <Button
                        htmlType="submit"
                        className="success-button w-full"
                      >
                        {localeString(language, "register")}
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </Col>
            </Row>
          </>
        </div>
      </div>
    </div>
  );
};
export default PublisherRegistration;
const schema = (language: string | undefined) => {
  return z.object({
    publicationOrganizationPhoneNumber: z
      .string()
      .regex(
        /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
        localeString(language, "PhoneNumberValidBD")
      )
      .nullable(),
    publicationOrganizationEmailAddress: z
      .string()
      .email(localeString(language, "correctEmailRequired"))
      .nullable(),
    publisherName: z.string().optional(),
    authorName: z.string().optional(),
    publicationOrganizationName: z
      .string()
      .nonempty(localeString(language, "publicationOrganizationNameRequired")),

    address: z.string().nonempty(localeString(language, "addressRequired")),
  });
};
