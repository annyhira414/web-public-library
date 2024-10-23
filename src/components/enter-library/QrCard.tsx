/** @format */

import {FC, useState} from "react";
import {Card, Modal, Row, Col, Button, Typography} from "antd";
import {localeString} from "@/lib/helpers/utils";
import QRCode from "react-qr-code";
import moment from "moment";
import {IQrCode} from "@/lib/model/user/enter-library";
import {humanize} from "@/lib/helpers/utils";

const {Paragraph} = Typography;
interface QrCardProps {
  QrCode: IQrCode;
  language: string | undefined;
}
export const QrCard: FC<QrCardProps> = ({QrCode, language}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrvalue, setQrValue] = useState<string>("hello");
  const [imageUrl, setImageUrl] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const download = () => {
      const svg: any = document.getElementById("QRCode");
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${imageUrl}`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
  return (
    <div>
      <Row>
        <Col xs={{span: 24}}>
          <Card hoverable className="mb-8 eventsCard">
            <h2 className="section-title text-sm">
              {localeString(language, "previousQRname")}
            </h2>
            <h3 className="mt-1 text-sm text-library-gray border-b pb-2">
              {QrCode?.library?.name}
            </h3>

            <h2 className="section-title text-sm mt-5">
              {localeString(language, "previousService")}
            </h2>
            {/* <Paragraph
              ellipsis={{
                rows: 4,
              }}
            >
              {parse(QrCode?.services)}
              {parse(eventItem?.details)}
            </Paragraph> */}
            <h3 className="mt-1 text-library-gray border-b pb-2">
              {/* {humanize(QrCode?.services?.join(", "))} */}
              {(QrCode?.services || [])
                .map((service) => humanize(service))
                ?.join(", ")}
            </h3>
            <div className="flex justify-between">
              <h3 className="mt-6 lg:p-2 rounded-md text-[#024F9C] font-semibold lg:bg-[#DFEFFF] text-[10px] lg:text-[10px]">
                {localeString(language, "qrCodeExpire")} -
                {moment(QrCode?.expired_at).format(" D MMMM YYYY")}
              </h3>
              <button
                onClick={showModal}
                className="text-library-primary font-semibold uppercase border border-library-primary text-xs lg:text-sm rounded-sm h-9 lg:h-11 mt-4 w-32 lg:w-52"
              >
                {localeString(language, "previousButtoun")}
              </button>
            </div>
          </Card>
        </Col>
      </Row>
      <div>
        <Modal
          centered
          className="-mt-10"
          footer={null}
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <Row>
            <Col
              className="w-40 h-40"
              lg={{span: 8, offset: 8}}
              xs={{span: 12, offset: 6}}
            >
              <QRCode
                className="border rounded p-2"
                style={{height: "auto", maxWidth: "100%", width: "100%"}}
                value={qrvalue}
                viewBox={`0 0 256 256`}
                id="QRCode"
              />
            </Col>
            <Col lg={{span: 8, offset: 8}} xs={{span: 9, offset: 5}}>
              <h3 className="w-[150px] lg:w-[158px] ml-3 lg:ml-0 text-center mt-1 p-1 rounded-md text-[#024F9C] font-semibold bg-library-light-secondary-green text-[10px]">
                {localeString(language, "qrCodeExpire")} -
                {moment(QrCode?.expired_at).format(" D MMMM YYYY")}
              </h3>
            </Col>
            <Col lg={{span: 12, offset: 6}} xs={{span: 24}}>
              <div className="xs:text-center lg:text-start">
                <h2 className="font-semibold text-sm mt-11">
                  {localeString(language, "qrCodeID")}
                </h2>
                <h3 className="mt-2 text-library-light-black text-sm border-b pb-1">
                  {QrCode?.user_uniq_id}
                </h3>
                <h2 className="font-semibold text-sm mt-7">
                  {localeString(language, "qrCodeLibrary")}
                </h2>
                <h3 className="mt-2 text-library-light-black text-sm border-b pb-1">
                  {QrCode?.library?.name}
                </h3>
                <h2 className="font-semibold text-sm mt-7">
                  {localeString(language, "qrCodeServices")}
                </h2>
                <h3 className="mt-2 text-library-light-black text-sm border-b pb-1">
                  {(QrCode?.services || [])
                    .map((service) => humanize(service))
                    ?.join(", ")}
                </h3>
              </div>
            </Col>
          </Row>
          <div className="flex justify-center borrowBookButton">
            <Button
              onClick={() => {
                download();
                handleCancel();
              }}
              className="w-64 button-secondary mt-12 h-12"
            >
              {localeString(language, "qrCodeButton")}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
