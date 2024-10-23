import { Col, Row } from "antd";
import { Input } from "../controls";
import { FC } from "react";
import { localeString } from "@/lib/helpers/utils";

interface IRecipientForm {
  control: any;
  errors: any;
  language: string | undefined;
}

const RecipientForm: FC<IRecipientForm> = ({ control, errors, language }) => {
  return (
    <>
      <Row gutter={[10, 0]}>
        <Col className="lg:ml-" xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            name="name"
            control={control}
            errors={errors}
            placeholder={localeString(language, "borrowRecipientName")}
            className="h-10 mb-2 rounded-lg"
          />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            name="phone"
            control={control}
            errors={errors}
            placeholder={localeString(language, "borrowRecipientMobile")}
            className="h-10 mb-2 rounded-lg"
          />
        </Col>
      </Row>
    </>
  );
};

export default RecipientForm;
