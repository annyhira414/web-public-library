import React, {FC, useEffect, useState} from "react";
import {Row, Col} from "antd";
import {GetServerSideProps} from "next";
import {getDetails} from "@/lib/services";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

import {ILibraryDetails} from "@/lib/model/library/index";
import {useRouter} from "next/router";
import parse from "html-react-parser";
import {localeString} from "@/lib/helpers/utils";
import {LibrarySlider, Container} from "@/components/library";
interface ILibraryDetailsProps {
  language: string;
  LibraryDetails: ILibraryDetails;
}

const LibraryDetails: FC<ILibraryDetailsProps> = ({
  language,
  LibraryDetails,
}) => {
  const router = useRouter();
  const {slug} = router?.query;

  useEffect(() => {
    slug;
  }, [slug]);

  const [zoom, setZoom] = useState(16);

  const containerStyle = {
    width: "100%",
    height: "540px",
  };

  return (
    <>
      <div className="pl-content-container">
        <div className="pt-10 ">
          <h1 className="pb-6 text-2xl font-semibold">
            {LibraryDetails?.name}
          </h1>
          <>
            <LibrarySlider LibraryDetails={LibraryDetails} />
          </>
        </div>

        <Row className="flex justify-between pb-24 ">
          <Col
            xs={{span: 24}}
            sm={{span: 11}}
            md={{span: 11}}
            lg={{span: 14}}
            xxl={{span: 14}}
          >
            <h1 className="card-title mb-5 lg:pt-16 mt-2 pt-10  ">
              {localeString(language, "aboutLibrary")}
            </h1>
            <p className="text-base">
              {parse(
                LibraryDetails?.description ? LibraryDetails?.description : ""
              )}
            </p>
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 12}}
            md={{span: 12}}
            lg={{span: 8}}
            xxl={{span: 8}}
          >
            <Container LibraryDetails={LibraryDetails} language={language} />
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: 24}}
            xxl={{span: 24}}
          >
            <div className="pt-10">
              <h1 className="section-title mb-4">
                {localeString(language, "map")}
              </h1>

              <div className="pt-4">
                <LoadScript
                  googleMapsApiKey={
                    "AIzaSyDJ_kNyi2L55dwJpg_CTnig-uaszmK2SBo"
                    // process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ||
                    // "AIzaSyDJFWaPPIO838nchVNZ9AzhfISFliuaRDE"
                  }
                  language={language}
                >
                  {LibraryDetails?.lat && LibraryDetails?.long && (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      zoom={zoom}
                      center={{
                        lat: parseFloat(LibraryDetails?.lat),
                        lng: parseFloat(LibraryDetails?.long),
                      }}
                    >
                      <div className="">
                        <Marker
                          position={{
                            lat: parseFloat(LibraryDetails?.lat),
                            lng: parseFloat(LibraryDetails?.long),
                          }}
                        ></Marker>
                      </div>
                    </GoogleMap>
                  )}
                </LoadScript>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default LibraryDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {slug} = context?.query;

  const res = await getDetails(
    `public_library/libraries`,
    slug as string,
    context?.req?.cookies?.["language"] || "bn"
  );
  if (res?.success) {
    return {
      props: {
        LibraryDetails: res?.data,
        language: context?.req?.cookies?.["language"] || "bn",
      },
    };
  } else {
    return {
      props: {
        LibraryDetails: [],
      },
    };
  }
};
