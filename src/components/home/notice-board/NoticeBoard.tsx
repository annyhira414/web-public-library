import { Col, Row } from "antd";
import React, { FC } from "react";
import SectionTitle from "../SectionTitle";
import NoticeCard from "@/components/activities/notice/NoticeCard";
import { INotice } from "@/lib/model/activities/notice";
import Link from "next/link";
import { localeString } from "@/lib/helpers/utils";
import { AddAnimation } from "@/components/common/AddAnimation";
import { TitleCompoent } from "@/components/common";

interface INoticeProps {
  noticeData: INotice[];
  language: string;
}

const NoticeBoard: FC<INoticeProps> = ({ language, noticeData }) => {
  return (
    <div className="w-full bg-library-order-sidebar-background ">
      <div className="pl-content-container">
        <div className="py-20 ">
          <TitleCompoent
            title={localeString(language, "noticeBoard")}
            link="/activities/notice"
            language={language}
          />
          <Row gutter={[25, 25]}>
            {noticeData?.map((noticeItems: INotice, index) => (
              <Col
                key={noticeItems?.id}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                xxl={{ span: 12 }}
              >
                <div>
                  <AddAnimation>
                    <NoticeCard
                      language={language}
                      notice={noticeItems}
                      startIndex={0}
                      index={index}
                    />
                  </AddAnimation>
                  {/* <NoticeBoard keyPersonItem={noticeItems} /> */}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
