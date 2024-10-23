import {FC, useEffect, useState} from "react";
import {message} from "antd";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import {useForm, useFieldArray} from "react-hook-form";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateData} from "@/lib/services";
import {FormProvider} from "react-hook-form";
import {AddBookForm} from "./AddBookForm";

interface IUpdateBook {
  // dialogProps: any;
  getListData: (memorandumsData: any) => void;
  onCancel: () => void;
  newAuthors?: {
    // addAuthors: string; //number:string;
    addAuthors: string;
  }[];
  memorandumsData: any;
  detailsData: any;
}
export const UpdateBook: FC<IUpdateBook> = ({
  memorandumsData,
  onCancel,
  getListData,
  detailsData,
}) => {
  const language: string | undefined = Cookies.get("language");
  const Schema = schema(language);

  const methods = useForm({
    defaultValues: {
      authors: detailsData?.authors.map((author: any) => ({name: author})),
      title: detailsData?.title,
      dateOfPublication: detailsData?.publication_date,
      isbn: detailsData?.isbn,
      price: detailsData?.price,
      subject: detailsData?.subject,
      websiteLink: detailsData?.publisher_website,
      edition: detailsData?.edition,
      numberOfPage: detailsData?.total_page,
      print: detailsData?.print,
      typeOfPaper: detailsData?.paper_type,
      typeOfBindings: detailsData?.binding_type,
      bookType: detailsData?.is_foreign ? "foreignBook" : "deshiBook",
      remarks: detailsData?.comment,
      publisher_name: detailsData?.publisher_name,
      organizationPhoneNumber: detailsData?.publisher_phone,
      publisherAddress: detailsData?.publisher_address,
    },

    mode: "all",
    resolver: zodResolver(Schema),
  });
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = methods;
  console.log("my details data is= ", detailsData);

  useEffect(() => {
    reset({
      authors: detailsData?.authors.map((author: any) => ({name: author})),
      title: detailsData?.title,
      dateOfPublication: new Date(detailsData?.publication_date),
      isbn: detailsData?.isbn,
      price: detailsData?.price,
      subject: detailsData?.subject,
      websiteLink: detailsData?.publisher_website,
      edition: detailsData?.edition,
      numberOfPage: detailsData?.total_page,
      print: detailsData?.print,
      typeOfPaper: detailsData?.paper_type,
      typeOfBindings: detailsData?.binding_type,
      bookType: detailsData?.is_foreign ? "foreignBook" : "deshiBook",
      remarks: detailsData?.comment,
      publisher_name: detailsData?.publisher_name,
      organizationPhoneNumber: detailsData?.publisher_phone,
      publisherAddress: detailsData?.publisher_address,
    });
  }, [detailsData]);

  const [messageApi, contextHolder] = message.useMessage();

  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const onSubmit = async (data: any) => {
    const params = {
      memorandum_id: memorandumsData?.id,
      author_name: data?.authors
        ?.map((author: {name: string}) => author.name)
        .join(","),
      title: data?.title,
      publication_date: data?.dateOfPublication.toString(),
      edition: data?.edition,
      print: data?.print,
      total_page: data?.numberOfPage,
      subject: data?.subject,
      price: data?.price,
      isbn: data?.isbn,
      paper_type: data?.typeOfPaper,
      binding_type: data?.typeOfBindings,
      is_foreign: data?.bookType === "foreignBook" ? true : false,
      publisher_name: data?.publisherName,
      publisher_phone: data?.organizationPhoneNumber,
      publisher_address: data?.publisherAddress,
      publisher_website: data?.websiteLink,
      comment: data?.remarks,
    };
    const res: any = await updateData(
      `public_library/publisher_biblios`,
      params,
      detailsData?.id,
      Cookies.get("token")
    );
    if (res?.success) {
      successMsg("Request Successfull");
      onCancel();
      getListData(memorandumsData?.id);
    } else {
      errorMsg(res?.data?.error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="pb-12">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="custom-placeholder"
          >
            <AddBookForm onCancel={onCancel} type="UPDATE" />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default UpdateBook;
const schema = (language: string | undefined) => {
  return z.object({
    title: z
      .string({
        required_error: localeString(language, "titleRequired"),
      })
      .min(1, {
        message: localeString(language, "titleRequired"),
      }),
    authors: z.array(
      z.object({
        name: z
          .string({
            required_error: localeString(language, "authorNameRequired"),
          })
          .min(1, {
            message: localeString(language, "authorNameRequired"),
          }),
      })
    ),

    dateOfPublication: z.date().refine(
      (date) => {
        return !(date instanceof Date && isNaN(date.getTime()));
      },
      {
        message: localeString(language, "dateRequired"),
      }
    ),
    price: z.number().min(1, localeString(language, "priceRequired")),
    isbn: z.string().min(1, localeString(language, "isbnRequired")),
    subject: z
      .string({
        required_error: localeString(language, "subjectRequired"),
      })
      .min(1, localeString(language, "subjectRequired")),
    edition: z
      .string({
        required_error: localeString(language, "editionRequired"),
      })
      .min(1, localeString(language, "editionRequired")),
    numberOfPage: z
      .number({
        required_error: localeString(language, "numberOfPagesRequired"),
      })
      .min(1, localeString(language, "numberOfPagesRequired")),
    print: z
      .string({
        required_error: localeString(language, "printRequired"),
      })
      .min(1, localeString(language, "printRequired")),
    typeOfPaper: z
      .string({
        required_error: localeString(language, "paperTypeRequired"),
      })
      .min(1, localeString(language, "paperTypeRequired")),
    typeOfBindings: z
      .string({
        required_error: localeString(language, "bindingTypeRequired"),
      })
      .min(1, localeString(language, "bindingTypeRequired")),
    bookType: z
      .string({
        required_error: localeString(language, "bookTypeRequired"),
      })
      .min(1, localeString(language, "bookTypeRequired")),
    publisher_name: z
      .string({
        required_error: localeString(language, "publisherNameRequired"),
      })
      .min(1, localeString(language, "publisherNameRequired")),
    organizationPhoneNumber: z
      .string({
        required_error: localeString(
          language,
          "organizationPhoneNumberRequired"
        ),
      })
      .regex(
        /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
        localeString(language, "phoneNumberRequired")
      ),
    publisherAddress: z
      .string({
        required_error: localeString(language, "publisherAddressRequired"),
      })
      .min(1, localeString(language, "publisherAddressRequired")),

    websiteLink: z
      .string({
        required_error: localeString(language, "websiteLinkRequired"),
      })
      .url({
        message: localeString(language, "validURLFormatRequired"),
      }),
    remarks: z.string().optional(),
  });
};
