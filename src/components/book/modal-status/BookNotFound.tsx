import { FC } from "react";
import { Button } from "antd";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";
import Image from "next/image";
import sorryImage from "../../../../public/images/sorry.svg";
import Link from "next/link";
import { BsFillInfoCircleFill } from "react-icons/bs";

type ILibrary = {
  label: string;
  value: string;
};

type IData = {
  is_available?: boolean;
  library_name?: string;
  shelves?: string[];
};

interface IBookNotFound {
  isDisabled?: boolean;
  control?: any;
  handleSubmit?: (value: any) => any;
  onSubmit?: (value: any) => void;
  allLibrary?: ILibrary[];
  data?: Partial<IData>;
  setModalStatus?: (value: string) => void;
  slug: string;
}
const BookNotFound: FC<IBookNotFound> = ({
  handleSubmit,
  onSubmit,
  setModalStatus,
  slug,
}) => {
  const language = Cookies.get("language");
  return (
    <div>
      <div className="px-10 py-5 md:px-28 md:py-10 my-6">
        <form onSubmit={handleSubmit && handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center">
            <Image
              src={sorryImage}
              alt="check image"
              height={200}
              width={200}
            />
          </div>

          <div className="mt-2">
            <div className="text-center">
              <h2 className="section-title">
                {localeString(language, "sorry")}
              </h2>
              <p className="mt-3">{localeString(language, "sorryMessage")} </p>
            </div>
            <div className="w-full mt-4">
              <Button
                type="primary"
                className="button-primary"
                block
                size="large"
                onClick={() => {
                  setModalStatus?.("select-library");
                }}
                // htmlType="submit"
              >
                {localeString(language, "checkAnotherLibrary")}
              </Button>
            </div>
            <div className="w-full mt-4">
              <Link href={`all-library/?slug=${slug}`}>
                <Button
                  type="primary"
                  className="button-secondary"
                  block
                  size="large"
                >
                  {localeString(language, "checkAllLibrary")}
                </Button>
              </Link>
            </div>
            <div className=" mt-3 bg-[#E2F1FF] p-2 flex-center-gap rounded-md">
              <BsFillInfoCircleFill className="text-[#024F9C] text-lg" />
              <h3 className="font-normal">
                {localeString(language, "checkTime")}
              </h3>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookNotFound;
