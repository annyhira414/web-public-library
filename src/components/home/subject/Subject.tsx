/** @format */

import { Row, Col, Card, Typography, Tooltip } from "antd";
import Link from "next/link";
import React, { FC } from "react";
import { localeString } from "@/lib/helpers/utils";
import { IsubList } from "@/lib/model/subjectList";
import { AddAnimation } from "@/components/common/AddAnimation";
import { TitleCompoent } from "@/components/common";

interface ISubject {
  language: string;
  subjectData: IsubList[];
}

export const Subject: FC<ISubject> = ({ language, subjectData }) => (
  <>
    <TitleCompoent
      title={localeString(language, "chooseYourSubject")}
      language={language}
      link="/subjectList?search_term="
    />
    <div className="subjectCard">
      <Row gutter={[25, 25]}>
        {subjectData.map((item: IsubList) => (
          <Col
            className="gutter-row "
            key={item.id}
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
            xxl={{ span: 4 }}
          >
            {/* <Card className="hover:bg-green-800 hover:text-white cursor-pointer h-20 w-full text-base font-normal ">
              {item}
            </Card> */}
            <AddAnimation>
              <Link
                href={`/subjectList/subjectWise?page=1&title=&subject=${item.id}`}
              >
                <Tooltip title={item.title}>
                  <div className="border group border-library-gray-300 flex justify-center items-center h-20 w-full p-6 hover:bg-library-primary transition duration-300 ease-in-out cursor-pointer rounded-lg subject-card">
                    <>
                      <Typography.Paragraph
                        ellipsis={{ rows: 2 }}
                        className="text-center text-base group-hover:text-white"
                      >
                        {item?.title}
                      </Typography.Paragraph>
                    </>
                  </div>
                </Tooltip>
              </Link>
            </AddAnimation>
          </Col>
        ))}
      </Row>
    </div>
  </>
);

export default Subject;
