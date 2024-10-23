import {localeString} from "@/lib/helpers/utils";
import {Button} from "antd";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const SuccessMsgBookDemand = ({}) => {
  const language: string | undefined = Cookies.get("language");

  return (
    <div className="py-10 flex justify-center lg:pl-10 w-full md:pl-4">
      <div className="success-area bg-white border-gray-300 rounded-2xl">
        <div className="success-msg p-12">
          <div className="flex justify-center">
            <Image
              src="/images/success.png"
              width={48}
              height={48}
              alt="success"
            ></Image>
          </div>
          <h1 className="my-4 section-title-dark text-center ">
            {localeString(language, "success")}
          </h1>
          <p className="text-center sub-text">
            {localeString(language, "successMsgBookDemand")}
          </p>
          <div className="pt-6 borrowBookButton">
            <Link href="/">
              <Button block htmlType="button" className="button-secondary">
                {localeString(language, "backToHome")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessMsgBookDemand;
