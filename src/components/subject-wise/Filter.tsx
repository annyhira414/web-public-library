/** @format */

import {Col, Row} from "antd";
import React, {FC, useEffect, useState} from "react";
import {RadioGroup, SearchControl, Select} from "@/components/controls";
import {localeString, currencyFormatter} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {Ioption, option} from "@/lib/model";
import {getData} from "@/lib/services";

interface AddBannerProps {
  control: any;
  authorData: option[];
  ratingData: option[];
}

const Filter: FC<AddBannerProps> = ({control, authorData, ratingData}) => {
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
            {/* <MultipleSelectControl
                  className="w-full"
                  control={control}
                  name="Author"
                  options={author}
                  placeholder={localeString(language, "author")}
                  setValue={setauthor}
                /> */}
            <Select
              className="w-full"
              control={control}
              name="publication"
              multiple={false}
              options={[]}
              placeholder={localeString(language, "subwisePublication")}
            />
          </div>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 23}}>
          <div className="multipleSelect ml-3">
            {/* <MultipleSelectControl
                  className="w-full"
                  control={control}
                  name="Author"
                  options={author}
                  placeholder={localeString(language, "author")}
                  setValue={setauthor}
                /> */}
            <Select
              className="w-full"
              control={control}
              name="author"
              multiple={false}
              options={authorData}
              placeholder={localeString(language, "author")}
            />
          </div>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 23}}>
          <div className="multipleSelect ml-3 mb-5">
            {/* <MultipleSelectControl
                  showSearch={false}
                  className="w-full"
                  control={control}
                  name="Rating"
                  options={rating}
                  placeholder={localeString(language, "rating")}
                  setValue={setrating}
                /> */}
            <Select
              className="w-full"
              control={control}
              name="rating"
              // multiple={true}
              options={ratingData}
              placeholder={localeString(language, "rating")}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
