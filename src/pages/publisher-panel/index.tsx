import React, {FC, useEffect, useState} from "react";
import {
  QuickScrollToTop,
  localeString,
  filterFalsyValues,
} from "@/lib/helpers/utils";
import {FormProvider, useForm} from "react-hook-form";
import {Col, Row, message} from "antd";
import Cookies from "js-cookie";
import {getData, updateData} from "@/lib/services";
import {IPublicationDetails, IPublisherData} from "@/lib/model/publisher";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Details, Edit, Deshboard} from "@/components/publisher-panel";

interface IPublisherPanelProps {
  language: string | undefined;
}

const PublisherPanel: FC<IPublisherPanelProps> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const [publisherData, setPublisherData] = useState<IPublicationDetails>();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const Schema = schema(language);

  const methods = useForm<IPublisherData>({
    defaultValues: {},
    mode: "all",
    resolver: zodResolver(Schema),
  });
  const {
    handleSubmit,
    formState: {isDirty, isValid},
  } = methods;

  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const errorMsg = (msg: any) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const getPublisherData = async () => {
    const res = await getData(
      `public_library/publishers/details`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setPublisherData(res?.data);
    }
  };

  useEffect(() => {
    getPublisherData();
  }, []);

  const onCancel = () => {
    setIsEditOpen(false);
  };

  const editItem = () => {
    setIsEditOpen(true);
    setPublisherData;
  };

  const onSubmit = async (data: IPublisherData) => {
    const params = {
      publication_name: data?.publication_name,
      organization_phone: data?.organization_phone || null,
      organization_email: data?.organization_email,
      name: data?.name || "",
      publisher_phone: data?.publisher_phone || "",
      author_name: data?.author_name || "",
      address: data?.address,
    };

    const res: any = await updateData(
      `public_library/publishers/${publisherData?.id}`,
      filterFalsyValues(params),
      undefined,
      Cookies.get("token")
    );
    if (res?.success) {
      setIsEditOpen(false);
      getPublisherData();
      QuickScrollToTop();
      successMsg(localeString(language, "updateSuccessfull"));
    } else {
      errorMsg(res?.data?.data?.error);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="pl-content-container">
        <Row gutter={[16, 25]}>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 6}}
            lg={{span: 6}}
            xl={{span: 6}}
            xxl={{span: 6}}
          >
            <Deshboard language={language} />
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 18}}
            lg={{span: 16}}
            xl={{span: 18}}
            xxl={{span: 18}}
          >
            <div className="lg:pl-10 w-full xl:w-10/12 md:pl-4">
              <h3 className="text-left section-title md:pt-12">
                {localeString(language, "publisherPanel")}
              </h3>
              <div className="md:pt-8 pt-4 pb-28 ">
                <div className="bg-white p-8">
                  <>
                    <div className="p-2 bg-gray-200 flex justify-center">
                      {localeString(language, "trackNo")}
                      <span className="pl-2">
                        {publisherData?.track_no
                          ? publisherData?.track_no
                          : "..."}
                      </span>
                    </div>
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={() => {
                          editItem();
                        }}
                        className="hover:underline hover:text-library-primary  text-library-primary py-3 sub-section-title"
                      >
                        {localeString(language, "edit")}
                      </button>
                    </div>
                  </>

                  {isEditOpen ? (
                    <div>
                      <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Edit
                            publisherData={publisherData}
                            onCancel={onCancel}
                          />
                        </form>
                      </FormProvider>
                    </div>
                  ) : (
                    <>
                      <Details publisherData={publisherData} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default PublisherPanel;
// const schema = (language: string | undefined) => {
//   return z.object({
//     publication_name: z.string().nonempty(localeString(language, "publicationOrganizationNameRequired")).optional(),
//     address: z.string().nonempty(localeString(language, "addressRequired")),
//     organization_phone: z
//       .string({
//         required_error: localeString(language, "phoneNumberRequired"),
//       })
//       .regex(/^(?:([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})?$/, localeString(language, "PhoneNumberValidBD")),

//     //organization_email: z.string().email(localeString(language, "correctEmailRequired")).optional(),
//     organization_email: z.string().regex(/^(?:(01){1}[3-9]{1}\d{8})?$/, localeString(language, "correctEmailRequired")),

//     name: z
//       .string()
//       //.nonempty(localeString(language, "publisherNameRequired"))
//       .optional(),
//     author_name: z
//       .string()
//       //.nonempty(localeString(language, "authorNameRequired"))
//       .optional(),
//   });
// };

const schema = (language: string | undefined) => {
  return z.object({
    publication_name: z
      .string()
      .nonempty(localeString(language, "publicationOrganizationNameRequired"))
      .optional(),
    address: z.string().nonempty(localeString(language, "addressRequired")),
    organization_phone: z
      .string({
        required_error: localeString(language, "phoneNumberRequired"),
      })
      .regex(
        /^(?:([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})?$/,
        localeString(language, "PhoneNumberValidBD")
      ),

    organization_email: z
      .string()
      .refine(
        (value) =>
          !value || /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value),
        {
          message: localeString(language, "correctEmailRequired"),
        }
      )
      .optional(),
    name: z
      .string()
      //.nonempty(localeString(language, "publisherNameRequired"))
      .optional(),
    author_name: z
      .string()
      //.nonempty(localeString(language, "authorNameRequired"))
      .optional(),
  });
};
