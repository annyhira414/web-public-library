import { DeleteMyProfile } from "@/components/user/my-profile";
import { Col, Row } from "antd";
import React, { FC } from "react";
interface IDeleteProfile {}

const DeleteProfile: FC<IDeleteProfile> = () => {
  return (
    <div>
      <div className="pl-content-container">
        <Row>
          <Col
            xs={{ offset: 2, span: 20 }}
            sm={{ offset: 2, span: 20 }}
            md={{ offset: 6, span: 12 }}
            lg={{ offset: 6, span: 12 }}
            xl={{ offset: 6, span: 12 }}
          >
            <DeleteMyProfile />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DeleteProfile;
