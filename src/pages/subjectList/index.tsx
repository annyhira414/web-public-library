import {Row, Col, Tooltip, Typography, Input} from "antd";
import React, {FC, useEffect, useState} from "react";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {localeString} from "@/lib/helpers/utils";
import {getData} from "@/lib/services";
import {IsubList} from "@/lib/model/subjectList";
import {MultipleSelectControl} from "@/components/controls/form-controls/MultipleSelectControl";
import {useForm} from "react-hook-form";
import {Ioption} from "@/lib/model";
import {useRouter} from "next/router";
import {Search} from "@/components/common";
import {DataNotFound} from "@/components/common";

interface ISubject {
  language: string;
  subjects: IsubList[];
}

const SubjectList: FC<ISubject> = ({language, subjects}) => {
  const [search_term, setSearch_term] = useState("");
  let router = useRouter();

  useEffect(() => {
    router.push({
      pathname: "subjectList",
      query: {
        search_term,
      },
    });
  }, [search_term]);

  return (
    <div className="subjectCard pl-content-container mb-24">
      <Row className="flex justify-between mt-10">
        <Col>
          <h1 className="section-title text-3xl mb-8">
            {localeString(language, "subJectLists")}
          </h1>
        </Col>
        <Col xs={{span: 24}} lg={{span: 7}}>
          <Search
            placeholder={localeString(language, "subSearch")}
            className="w-full"
            setKeywords={setSearch_term}
          />
        </Col>
      </Row>
      <Row className="mt-8" gutter={[25, 25]}>
        {subjects?.length > 0 ? (
          <>
            {subjects?.map((item: IsubList) => (
              <Col
                className="gutter-row "
                key={item.id}
                xs={{span: 12}}
                sm={{span: 12}}
                md={{span: 8}}
                lg={{span: 4}}
                xl={{span: 4}}
                xxl={{span: 4}}
              >
                <Link
                  // href={
                  //   `/subjectList/subjectWise?page=1&title=&subjectFilter=${item.id}`
                  // }
                  href={`/subjectList/subjectWise?page=1&title=&subject=${item.id}`}
                >
                  <Tooltip title={item.title}>
                    <div className="border group border-[#D9D9D9] flex justify-center items-center h-20 w-full p-6 hover:bg-library-primary transition duration-300 ease-in-out cursor-pointer rounded-lg subject-card">
                      <>
                        <Typography.Paragraph
                          ellipsis={{rows: 2}}
                          className="text-center text-base group-hover:text-white"
                        >
                          {item?.title}
                        </Typography.Paragraph>
                      </>
                    </div>
                  </Tooltip>
                </Link>
              </Col>
            ))}
          </>
        ) : (
          <DataNotFound title={localeString(language, "subNotfound")} />
        )}
      </Row>
    </div>
  );
};

export default SubjectList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  type commonType = string | string[] | null;
  type Iparam = {
    sort_by: "asc";
    search_term: string | any;
  };
  let search_term: commonType = context?.query?.search_term || null;

  const params: Iparam = {
    sort_by: "asc",
    search_term: search_term,
  };

  const res: any = await getData(
    `/public_library/biblio_subjects`,
    params,
    context?.req?.cookies?.["language"] || "bn"
  );

  if (res?.data?.length > 0) {
    return {
      props: {
        subjects: res?.data || [],
        language: context?.req?.cookies?.["language"] || "bn",
        token: context?.req?.cookies?.["token"] || "",
      },
    };
  } else {
    return {
      props: {
        subjects: [],
        language: context?.req?.cookies?.["language"] || "bn",
        token: context?.req?.cookies?.["token"] || "",
      },
    };
  }
};
