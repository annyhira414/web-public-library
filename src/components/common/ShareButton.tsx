import React, {FC} from "react";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  InstapaperShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  ViberShareButton,
} from "react-share";
import {BsInstagram, BsTelegram, BsWhatsapp} from "react-icons/bs";
import {SiViber} from "react-icons/si";
import {ConfigProvider, Modal} from "antd";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";

interface IShareButton {
  isModalOpen?: boolean;
  url: string;
  onCancel?: () => void;
}

export const ShareButton: FC<IShareButton> = ({url, isModalOpen, onCancel}) => {
  const language = Cookies.get("language");
  const currentDomain = window.location.origin;

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              colorBgMask: "rgba(0,0,0,0.10)",
              boxShadow: "none",
            },
          },
        }}
      >
        <Modal open={isModalOpen} footer={null} onCancel={onCancel}>
          <div className="share-data-modal mt-5 text-center">
            <h2 className="font-bold text-2xl text-gray-700 mb-3">
              {localeString(language, "socialShare")}
            </h2>
            <div className="share-icon">
              <>
                <TwitterShareButton
                  url={`${currentDomain}${url}`}
                  className="mr-2"
                >
                  <TwitterIcon size={32} round className="mr-2" />
                </TwitterShareButton>

                <FacebookShareButton
                  url={`${currentDomain}${url}`}
                  className="mr-2"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton
                  url={`${currentDomain}${url}`}
                  className="mr-2"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <WhatsappShareButton
                  url={`${currentDomain}${url}`}
                  className="mr-2"
                >
                  <BsWhatsapp size={32} className="text-[#54D467]" />
                </WhatsappShareButton>
                <InstapaperShareButton
                  url={`${currentDomain}${url}`}
                  className="mr-2"
                >
                  <BsInstagram size={32} className="text-[#F56040]" />
                </InstapaperShareButton>
                <TelegramShareButton
                  url={`${currentDomain}${url}`}
                  className="mr-2"
                >
                  <BsTelegram size={32} className="text-[#0088cc]" />
                </TelegramShareButton>
                <ViberShareButton url={`${currentDomain}${url}`}>
                  <SiViber size={32} className="text-[#59267c]" />
                </ViberShareButton>
              </>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};
