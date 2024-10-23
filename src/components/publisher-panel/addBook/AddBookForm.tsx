import {FC, useEffect, useState} from "react";
import {Button, Divider, message} from "antd";
import Cookies from "js-cookie";
import {localeString, QuickScrollToTop} from "@/lib/helpers/utils";
import {useForm, useFieldArray} from "react-hook-form";
import {
  CustomRadioGroup,
  DatePickerControl,
  FieldLabel,
  Input,
  TextareaControl,
  InputNumber,
} from "@/components/controls";
import {useRouter} from "next/router";
import {BiArrowBack} from "react-icons/bi";
import {IoAddCircle} from "react-icons/io5";
import {Select} from "@/components/controls";
import {AiFillDelete} from "react-icons/ai";
import {bookTypeRadio} from "@/lib/constants/publisher-panel";
import {useFormContext} from "react-hook-form";

interface IMainForm {
  onCancel: () => void;
  type: string;
}
export const AddBookForm: FC<IMainForm> = ({onCancel, type}) => {
  const language: string | undefined = Cookies.get("language");

  const {
    control,
    watch,
    formState: {errors, isValid},
  } = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name: "authors",
    control,
  });

  const [step, setStep] = useState(0);

  const nextButton = () => {
    setStep((pre) => pre + 1);
    QuickScrollToTop();
  };

  const backStep = (BackStep: number) => {
    setStep(BackStep);
  };
  const renderButton = () => {
    if (step === 0) {
      return (
        <div className="pr-8 borrowBookButton">
          <Button
            className="button-secondary px-12  "
            onClick={() => nextButton()}
            block
          >
            {localeString(language, "nextbtn")}
          </Button>
        </div>
      );
    }
  };

  const bookTypeRadio = [
    {
      label: <>{localeString(language, "foreignBook")}</>,
      value: "foreignBook",
    },
    {
      label: <>{localeString(language, "deshiBook")}</>,
      value: "deshiBook",
    },
  ];

  const paperTypeOptions = [
    {label: <>{localeString(language, "whitePaper")}</>, value: "white_paper"},
    {
      label: <>{localeString(language, "publisherNewspaper")}</>,
      value: "newspaper",
    },
  ];

  const bindingTypeOptions = [
    {
      label: <>{localeString(language, "hardBinding")} </>,
      value: "hard_binding",
    },
    {
      label: <>{localeString(language, "paperBinding")}</>,
      value: "paper_binding",
    },
  ];

  return (
    <>
      <div className="pb-12">
        <div className="pb-4 cursor-pointer" onClick={() => onCancel()}>
          <div className="flex justify-start ">
            <div className="mt-2 text-xl">
              <BiArrowBack />
            </div>
            <button className="pl-2 pt-1 text-lg">
              {localeString(language, "back")}
            </button>
          </div>
        </div>
        <div className="bg-white pb-4">
          <div className="p-8 rounded-lg">
            {step === 1 && (
              <button className="mt-0" onClick={() => backStep(0)}>
                <BiArrowBack className="text-2xl" />
              </button>
            )}
            <div className="font-bold text-2xl pt-6  ">
              {type === "UPDATE"
                ? localeString(language, "updateBook")
                : localeString(language, "addBook")}
            </div>
            <Divider className="bg-library-gray-600 mt-2" />
            {step === 0 && (
              <>
                <div>
                  <div className="pb-4">
                    <FieldLabel
                      required
                      className="font-normal text-sm  pb-2"
                      name="bookType"
                      label={localeString(language, "bookType")}
                    />

                    <CustomRadioGroup
                      className="section border hover:border-library-primary broder-library-gray-300 my-3 rounded-lg "
                      name="bookType"
                      errors={errors}
                      options={bookTypeRadio}
                      control={control}
                      direction="vertical"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel
                    required
                    className="font-normal text-sm  pb-2"
                    name="title"
                    label={localeString(language, "title")}
                  />
                  <Input
                    name="title"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "title")}
                    className="mb-2 rounded-md"
                  />
                </div>
                {fields &&
                  fields?.map((item: any, index: number) => (
                    <div className="form-group" key={item.id}>
                      <div className="w-full flex justify-between items-center pt-4">
                        <FieldLabel
                          required
                          className="font-normal text-sm pb-2"
                          name="authors"
                          label={localeString(language, "author")}
                        />
                        {fields?.length > 1 && (
                          <div
                            onClick={() => remove(index)}
                            className="cursor-pointer"
                          >
                            <AiFillDelete className="text-red-600" />
                          </div>
                        )}
                      </div>
                      <div className="w-full">
                        <Input
                          control={control}
                          name={`authors.${index}.name`}
                          errors={errors}
                          placeholder={localeString(language, "authorName")}
                        />
                      </div>
                    </div>
                  ))}
                <div className="flex justify-end">
                  <div
                    className="pt-2 flex justify-between cursor-pointer"
                    onClick={() => append({name: ""})}
                  >
                    <div className="font-bold text-lg pr-1">
                      <IoAddCircle className="" />
                    </div>
                    <button
                      type="button"
                      className="text-library-gray-600 hover:underline "
                    >
                      {localeString(language, "addAnotherAuthor")}
                    </button>
                  </div>
                </div>

                <div className="">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="publisher_name"
                    label={localeString(language, "publisherName")}
                  />
                  <Input
                    name="publisher_name"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "publisherName")}
                    className="mb-2 rounded-md "
                  />
                </div>
                <div className="pt-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="organizationPhoneNumber"
                    label={localeString(language, "organizationPhoneNumber")}
                  />
                  <Input
                    name="organizationPhoneNumber"
                    control={control}
                    errors={errors}
                    placeholder={localeString(
                      language,
                      "organizationPhoneNumber"
                    )}
                    className="mb-2 rounded-md "
                  />
                </div>

                <div className="pt-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="publisherAddress"
                    label={localeString(language, "publisherAddress")}
                  />
                  <Input
                    name="publisherAddress"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "publisherAddress")}
                    className="mb-2 rounded-md "
                  />
                </div>
                <div className="pt-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="dateOfPublication"
                    label={localeString(language, "dateOfPublication")}
                  />
                  <div>
                    <DatePickerControl
                      name="dateOfPublication"
                      control={control}
                      format="YYYY-MM-DD"
                      placeholder={localeString(language, "dateOfPublication")}
                      allowClear={true}
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="isbn"
                    label={localeString(language, "isbn")}
                  />
                  <Input
                    name="isbn"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "isbn")}
                    className="mb-2 rounded-md"
                  />
                </div>

                <div className="pt-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="price"
                    label={localeString(language, "price")}
                  />
                  <InputNumber
                    name="price"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "price")}
                    className="mb-2 rounded-md"
                  />
                </div>
                <div className="pt-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="subject"
                    label={localeString(language, "subject")}
                  />
                  <Input
                    name="subject"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "subject")}
                    className="mb-2 rounded-md"
                  />
                </div>
                <div className="pt-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="websiteLink"
                    label={localeString(language, "websiteLink")}
                  />
                  <Input
                    name="websiteLink"
                    control={control}
                    errors={errors}
                    placeholder="https://www.google.com/"
                    className="mb-2 rounded-md"
                  />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <div className="pb-4">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="edition"
                    label={localeString(language, "edition")}
                  />
                  <Input
                    name="edition"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "edition")}
                    className="mb-2 rounded-md"
                  />
                </div>
                <div className="pb-1">
                  <FieldLabel
                    required
                    className="font-normal text-sm  pb-2"
                    name="numberOfPage"
                    label={localeString(language, "numberOfPage")}
                  />
                  <InputNumber
                    name="numberOfPage"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "numberOfPage")}
                    className="mb-2 rounded-md"
                  />
                </div>
                <div className="pt-2 pb-2">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="print"
                    label={localeString(language, "printing")}
                  />
                  <Input
                    name="print"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "printing")}
                    className="mb-2 rounded-md "
                  />
                </div>
                <div className="pt-2 pb-4">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="typeOfPaper"
                    label={localeString(language, "typeOfPaper")}
                  />
                  <>
                    <Select
                      showSearch={false}
                      className="h-full"
                      control={control}
                      name="typeOfPaper"
                      options={paperTypeOptions}
                      placeholder={localeString(language, "selectTypeOfPaper")}
                    />
                  </>
                </div>
                <div className="pt-2 pb-4">
                  <FieldLabel
                    required
                    className="font-normal text-sm pb-2"
                    name="typeOfBindings"
                    label={localeString(language, "typeOfBindings")}
                  />
                  <Select
                    showSearch={false}
                    className="h-full"
                    control={control}
                    name="typeOfBindings"
                    options={bindingTypeOptions}
                    placeholder={localeString(language, "selectTypeOfBindings")}
                  />
                </div>
                <div className="pt-2 ">
                  <FieldLabel
                    className="font-normal text-sm pb-2"
                    name="remarks"
                    label={localeString(language, "remarks")}
                  />
                  <TextareaControl
                    name="remarks"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "writeComments")}
                    className="mb-2 rounded-md"
                  />
                </div>
              </>
            )}
          </div>
          <div className="pt-8">
            <div className="flex justify-between">
              {step === 1 ? (
                <div className="pl-8 bookButton w-44">
                  <Button
                    className="button-primary"
                    onClick={() => backStep(0)}
                    block
                  >
                    {localeString(language, "previousBtn")}
                  </Button>
                </div>
              ) : (
                <div className="pl-8 bookButton w-44">
                  <Button
                    className="button-primary"
                    onClick={() => onCancel()}
                    block
                  >
                    {localeString(language, "cancel")}
                  </Button>
                </div>
              )}

              <div className="">
                {renderButton()}
                <>
                  {step === 1 && (
                    <div className="w-44 pr-8 pl-4 borrowBookButton">
                      <Button
                        disabled={!isValid}
                        htmlType="submit"
                        className="button-secondary "
                        block
                      >
                        {localeString(language, "submit")}
                      </Button>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
