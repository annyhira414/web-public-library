import { Loader } from "@/components/common";
import { localeString } from "@/lib/helpers/utils";
import { getData } from "@/lib/services";
import { Image } from "antd";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import React, { FC, useEffect, useState } from "react";

interface IDocumentDetails {}

export const DocumentDetails: FC<IDocumentDetails> = () => {
  const userToken = Cookies.get("token");
  const language = Cookies.get("language");
  const [loader, setLoader] = useState(false);
  const [documentDetails, setDocumentDetails] = useState<any>({});
  const getMemberDocumentDetails = async () => {
    setLoader(true);
    const res = await getData(
      `public_library/members/documents`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setDocumentDetails(res?.data);
      setLoader(true);
    }
  };
  useEffect(() => {
    getMemberDocumentDetails();
  }, []);
  return (
    <div>
      {!loader ? (
        <Loader />
      ) : (
        <>
          {documentDetails?.identity_number ? (
            <>
              <div className="mb-6">
                <h4 className="font-bold font-playfairDisplay text-xl text-gray-700">
                  {localeString(language, "documentDetails")}
                </h4>
              </div>
              <div className="identity-number-card border p-4 rounded shadow">
                <p className="text-sm text-gray-700 mb-2.5">
                  {localeString(language, "nidNumber")}
                </p>
                <p className="text-sm text-gray-700 ">
                  {documentDetails?.identity_number}
                </p>
              </div>
              <div className="identity-image my-6">
                <p className="text-sm text-gray-700 mb-2.5">
                  {localeString(language, "nidDocument")}
                </p>
                {documentDetails?.birth_certificate_image_url ? (
                  <div className="birth-certificate mt-6 ">
                    {!isEmpty(documentDetails?.birth_certificate_image_url) && (
                      <Image
                        src={
                          documentDetails?.birth_certificate_image_url
                            ? documentDetails?.birth_certificate_image_url
                            : "/no-image.png"
                        }
                        height={80}
                        width={80}
                        alt="nid-front-side"
                        className="border p-2"
                      />
                    )}
                  </div>
                ) : (
                  <div className="nid-image flex gap-4">
                    <div className="front-side">
                      {!isEmpty(documentDetails?.nid_front_image_url) && (
                        <Image
                          src={
                            documentDetails?.nid_front_image_url
                              ? documentDetails?.nid_front_image_url
                              : "/no-image.png"
                          }
                          height={80}
                          width={80}
                          alt="nid-front-side"
                          className="border p-2"
                        />
                      )}
                    </div>
                    <div className="back-side">
                      {!isEmpty(documentDetails?.nid_back_image_url) && (
                        <Image
                          src={
                            documentDetails?.nid_back_image_url
                              ? documentDetails?.nid_back_image_url
                              : "/no-image.png"
                          }
                          height={80}
                          width={80}
                          alt="nid-front-side"
                          className="border p-2"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="student-id-image">
                {documentDetails?.student_id_image_url && (
                  <div className="student-id-image mt-6 ">
                    <p className="text-sm text-gray-700 mb-2.5">
                      {localeString(language, "studentIdentityImage")}
                    </p>
                    {!isEmpty(documentDetails?.student_id_image_url) && (
                      <Image
                        src={
                          documentDetails?.student_id_image_url
                            ? documentDetails?.student_id_image_url
                            : "/no-image.png"
                        }
                        height={80}
                        width={80}
                        alt="nid-front-side"
                        className="border p-2"
                      />
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center bg-white p-24">
              <h2 className="font bold font-playfairDisplay text-2xl md:text-4xl lg:text-4xl xl:text-4xl xxl:text-4xl text-library-black">
                {localeString(language, "notAMember")}
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};
