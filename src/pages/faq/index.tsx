import { DataNotFound, Search } from "@/components/common";
import { Select } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";
import { option } from "@/lib/model";
import { getData } from "@/lib/services";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import parse from "html-react-parser";

type IOptions = {
  id: string;
  header: string;
  content: string;
};
type IFaq = {
  question: string;
  answer: string;
  faq_category: {
    title: string;
  };
};

type ICategory = {
  title: string;
};

type IFAQProps = {
  language: string | undefined;
  data: IOptions[];
};

const Faq: FC<IFAQProps> = ({ language, data }) => {
  const [category, setCategory] = useState<option[]>([]);
  const { control, watch } = useForm();
  const categoryValue = watch("category");
  let router = useRouter();
  useEffect(() => {
    getAllQuestions();
  }, []);

  const getAllQuestions = async () => {
    const res = await getData(
      "public_library/faq_categories/dropdown",
      {},
      language
    );
    if (res.success) {
      setCategory(
        res?.data?.map((item: ICategory, index: number) => {
          return {
            label: item?.title,
            value: item?.title,
          };
        })
      );
    }
  };

  useEffect(() => {
    categoryValue
      ? router.push({
          pathname: "faq",
          query: {
            categoryValue,
          },
        })
      : router.push({
          pathname: "faq",
          query: {
            categoryValue,
          },
        });
  }, [categoryValue]);

  return (
    <div className="pl-content-container py-8 faq">
      <div className="flex justify-between items-center pb-4">
        <h1 className="section-title">{localeString(language, "faq")}</h1>
        <div>
          <Select
            name="category"
            control={control}
            options={category}
            placeholder={localeString(language, "selectCategory")}
            className="w-full md:w-40"
          />
        </div>
      </div>

      {data?.length > 0 ? (
        <Collapse
          accordion
          bordered={false}
          defaultActiveKey={["0"]}
          expandIconPosition="end"
          expandIcon={({ isActive }) =>
            isActive ? <MinusOutlined /> : <PlusOutlined />
          }
        >
          {data?.map((item: IOptions) => (
            <Collapse.Panel key={item.id} header={item.header}>
              {parse(item.content)}
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
};

export default Faq;

export const getServerSideProps: GetServerSideProps = async (context) => {
  type queryType = string | string[] | null;

  type IFaq = {
    question: string;
    answer: string;
    faq_category: {
      title: string;
    };
  };
  type IOptions = {
    id: string;
    header: string;
    content: string;
  };

  let category: queryType = context?.query?.categoryValue || null;

  const answers = await getData(
    "public_library/faqs",
    { faq_category_title: category },

    context?.req?.cookies?.["language"] || "bn"
  );
  const data: IOptions = answers?.data?.map((item: IFaq, index: number) => {
    return {
      id: index.toString(),
      header: item?.question,
      content: item?.answer,
    };
  });

  if (answers?.success) {
    return {
      props: {
        data: data,
        language: context?.req?.cookies?.["language"] || "",
      },
    };
  } else {
    return {
      props: {
        data: [],
      },
    };
  }
};
