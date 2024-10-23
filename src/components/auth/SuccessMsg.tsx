import { localeString } from "@/lib/helpers/utils";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SuccessMsg = ({ language }: any) => {
  const router = useRouter();

  return (
    <>
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
          <h1 className="my-4 text-[#006A4E] font-serif font-bold text-3xl  text-center font-[playfairDisplay]">
            {localeString(language, "success")}
          </h1>
          <p className="text-center font-[playfairDisplay]">
            {localeString(language, "successMsg")}
          </p>
          <div className="borrowBookButton">
            <Link href="/auth/login?previous=register">
              <Button block htmlType="button" className=" button-secondary">
                {localeString(language, "logged")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default SuccessMsg;
