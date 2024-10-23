import { Avatar } from "antd";
import React, { FC } from "react";
import { IKeyPeople } from "@/lib/model/home-page-models";

interface IKeyPerson {
  keyPersonItem: IKeyPeople;
}

const KeyPersonCard: FC<IKeyPerson> = ({ keyPersonItem }) => {
  return (
    <div className="key-person-card">
      <div className="flex justify-center items-center">
        <Avatar
          size={80}
          src={keyPersonItem?.image_url?.desktop_image}
          //   icon={<AntDesignOutlined />}
        />
      </div>
      <div className="text-center my-2">
        <h1 className="text-lg font-bold ">{keyPersonItem?.name}</h1>
        <p className="text-base text-[#434343] font-normal">
          {keyPersonItem?.designation}
        </p>
      </div>
    </div>
  );
};

export default KeyPersonCard;
