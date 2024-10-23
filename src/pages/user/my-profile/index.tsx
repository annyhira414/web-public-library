import { PersonalInfoCard } from "@/components/user/my-profile";
import { ProfileSidebar } from "@/components/user/my-profile/ProfileSidebar";
import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { NextSeo } from "next-seo";
import React, { FC } from "react";

interface IMyProfile {}
const MyProfile: FC<IMyProfile> = () => {
  const language = Cookies.get("language")
  return (
    <>
      <NextSeo
        title={`${localeString(language,"myProfileTitle")}`}
        description="User Profile"
        openGraph={{
          title: "Public Library : My Profile",
          description: "The public libraries' User Profile Will Be Shown here",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library : My Profile",
            },
          ],
        }}
      />
      <div className="my-6">
        <div className="pl-content-container">
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              xxl={{ span: 8 }}
            >
              <ProfileSidebar />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 18 }}
              lg={{ span: 18 }}
              xl={{ span: 16 }}
              xxl={{ span: 16 }}
            >
              <PersonalInfoCard />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
