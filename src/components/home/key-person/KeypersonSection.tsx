/** @format */

import {Avatar, Col, Row} from "antd";
import React, {FC} from "react";
import KeyPersonCard from "./KeyPersonCard";
import {IKeyPeople} from "@/lib/model/home-page-models";
import {localeString} from "@/lib/helpers/utils";

interface IKeyPerson {
  keyPersonData: IKeyPeople[];
  language: string;
}

const KeypersonSection: FC<IKeyPerson> = ({keyPersonData, language}) => {
  return (
    <div>
      {keyPersonData?.length > 0 ? (
        <div className="w-full bg-library-primary ">
          <div className="pl-content-container">
            <div className="py-20 ">
              <h1 className="section-title-light">
                {localeString(language, "ourKeyPersons")}
              </h1>
              <Row gutter={[25, 25]}>
                {keyPersonData?.map((keyPeopleItems) => (
                  <Col
                    key={keyPeopleItems.name}
                    xs={{span: 24}}
                    sm={{span: 24}}
                    md={{span: 12}}
                    lg={{span: 8}}
                    xl={{span: 6}}
                    xxl={{span: 6}}
                  >
                    <div>
                      <KeyPersonCard keyPersonItem={keyPeopleItems} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default KeypersonSection;
