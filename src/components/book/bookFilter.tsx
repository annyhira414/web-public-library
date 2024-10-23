/** @format */

import {Col, Row} from "antd";
import React, {FC} from "react";
import {Select} from "@/components/controls";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {option} from "@/lib/model";

interface AddBannerProps {
  control: any;
  authorData: option[];
  ratingData: option[];
}

const BookFilter: FC<AddBannerProps> = ({control, authorData, ratingData}) => {
  const language = Cookies.get("language");

  return (
    <div>
      <div>
        <h1 className="section-title text-base lg:w-96 p-3">
          {localeString(language, "subwiseFilter")}
        </h1>
      </div>
      <Row gutter={[8, 8]}>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 23}}>
          <div className="multipleSelect ml-3">
            <Select
              className="w-full"
              control={control}
              name="publication"
              multiple={true}
              options={[]}
              placeholder={localeString(language, "subwisePublication")}
            />
          </div>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 23}}>
          <div className="multipleSelect ml-3">
            <Select
              className="w-full"
              control={control}
              name="author"
              multiple={true}
              options={authorData}
              placeholder={localeString(language, "author")}
            />
          </div>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 23}}>
          <div className="multipleSelect ml-3 mb-5">
            <Select
              className="w-full"
              control={control}
              name="rating"
              multiple={true}
              options={ratingData}
              placeholder={localeString(language, "rating")}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookFilter;
