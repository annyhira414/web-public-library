/** @format */

import React, { FC } from "react";
import {
  FooterTop,
  FooterContent,
  MyAliceChatWidget,
} from "@/components/footer";
import { Divider } from "antd";

interface IFooter {
  language: string | undefined;
}
export const Footer: FC<IFooter> = ({ language }) => {
  return (
    <div className="bg-library-primary ">
      <div className="content-container ">
        <FooterTop language={language} />
        <FooterContent language={language} />
        <MyAliceChatWidget />
      </div>
    </div>
  );
};
