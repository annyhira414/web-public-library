import {Col, Row} from "antd";
import {Checkbox, Input, Select} from "../controls";
import {FC} from "react";
import {localeString} from "@/lib/helpers/utils";
import {option} from "@/lib/model";

interface IAddAddress {
  control: any;
  errors: any;
  language: string | undefined;
  showAddAddress: boolean;
  divisions: option[];
  districts: option[];
  thanas: option[];
  watch: any;
}

const AddAddress: FC<IAddAddress> = ({
  control,
  errors,
  language,
  showAddAddress,
  divisions,
  districts,
  thanas,
  watch,
}) => {
  return (
    <>
      <Col>
        {showAddAddress && (
          <div className="">
            <Row gutter={[20, 0]} className="mt-2 lg:mt-5">
              <Col xs={{span: 24}} lg={{span: 8}}>
                <Select
                  // {...methods.register}
                  name="divisions"
                  control={control}
                  // errors={errors}
                  options={divisions}
                  placeholder={localeString(
                    language,
                    "borrowRecipientDivision"
                  )}
                  className="h-11 mb-1 lg:mb-0"
                />
              </Col>
              <Col xs={{span: 24}} lg={{span: 8}}>
                <Select
                  // {...methods.register}
                  name="districts"
                  control={control}
                  errors={errors}
                  options={districts}
                  placeholder={localeString(
                    language,
                    "borrowRecipientDistrict"
                  )}
                  className="h-11 mb-1 lg:mb-0"
                />
              </Col>

              <Col xs={{span: 24}} lg={{span: 8}}>
                <Select
                  // {...methods.register}
                  name="thanas"
                  control={control}
                  errors={errors}
                  options={thanas}
                  placeholder={localeString(language, "borrowRecipientThana")}
                  className="h-11"
                />
              </Col>

              <Col xs={{span: 24}} lg={{span: 24}} className="lg:mt-5 mt-1">
                <Input
                  // {...methods.register}
                  name="addressLine"
                  control={control}
                  errors={errors}
                  placeholder={localeString(
                    language,
                    "borrowRecipientAddressline"
                  )}
                  className="h-10 mb-2"
                />
              </Col>
              <Col className="mt-5" lg={{span: 24}}>
                <Checkbox
                  name="isSaveAddress"
                  control={control}
                  errors={errors}
                  label={localeString(language, "borrowCheckSave")}
                />
              </Col>

              <Checkbox
                name="addNewAddress"
                control={control}
                errors={errors}
                label={localeString(language, "borrowCheckSave")}
                className="hidden"
              />

              <Col xs={{span: 24}} lg={{span: 24}} className="mt-5 mb-6">
                <Input
                  name="addressTitle"
                  control={control}
                  errors={errors}
                  placeholder={localeString(
                    language,
                    watch("isSaveAddress")
                      ? "borrowRecipientAddressRequired"
                      : "borrowRecipientAddress"
                  )}
                  className="h-10"
                />
              </Col>
            </Row>
          </div>
        )}
      </Col>
    </>
  );
};

export default AddAddress;
