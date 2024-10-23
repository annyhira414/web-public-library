import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

interface GlobalSearchProps {
  isModalOpen: boolean;
  toogleModal: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isModalOpen, toogleModal }) => {
  const [value, setValue] = useState(1);

  const handleOk = () => {
    toogleModal();
  };

  const handleCancel = () => {
    toogleModal();
  };
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Modal
      bodyStyle={{ height: 400, padding: 16 }}
      width={800}
      title="Public Model"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg pt-6">What are you lookinng for?</h1>
        </div>
        <div className="">
          <ArrowRightOutlined className="py-7" />
        </div>
      </div>
      <hr />

      <Radio.Group onChange={onChange} value={value} className="pt-8">
        <Radio value={1}>Archive</Radio>
        <Radio value={2}>Book</Radio>
        <Radio value={3}>Events</Radio>
      </Radio.Group>
    </Modal>
  );
};

export default GlobalSearch;
