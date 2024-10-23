import React from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

const onChange: PaginationProps["onChange"] = (pageNumber) => {
};

export const PaginationComponent = () => {
  return (
    <div className="py-10">
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={500}
        onChange={onChange}
      />
    </div>
  );
};
