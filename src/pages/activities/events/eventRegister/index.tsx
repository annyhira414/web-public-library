import React, {FC, useState} from "react";
import {Row, Col, Divider, Button, Checkbox} from "antd";
import {useForm, FormProvider} from "react-hook-form";
import EventRegisterForm from "@/components/auth/EventRegisterForm";
import {IEventDetails} from "@/lib/model/activities/eventDetails";
import {getDetails} from "@/lib/services";
import {getData} from "@/lib/services";
import {GetServerSideProps} from "next";
import moment from "moment";
import {
  localeString,
  currencyFormatter,
  commaRemover,
} from "@/lib/helpers/utils";
import {useRouter} from "next/router";
import Link from "next/link";

// const onChange = (e: CheckboxChangeEvent) => {
// };
interface IEventDetailsProps {
  eventDetails: IEventDetails;
  language: string;
  slug: string;
  registration_fields: string[];
}

const EventRegister: FC<IEventDetailsProps> = ({
  language,
  eventDetails,
  registration_fields,
}) => {
  const router = useRouter();
  const methods = useForm();
  const onSubmit = (data: any) => data;
  const slug = router?.query?.slug;
  const [library, setLibrary] = useState<any>(false);

  return (
    <div className="content-container">
      <div className="lg:mx-20">
        <h1 className="text-library-light-black mt-10 section-title">
          {localeString(language, "eventRegistration")}
        </h1>
        <Row className="mt-10">
          <Col className="mb-8" xs={{span: 24}} lg={{span: 10}}>
            <div className="p-8 border border-library-gray-300 rounded-lg mb-6 h-auto bg-gray-200">
              <h1 className="section-title text-base">
                {localeString(language, "eventDetails")}
                <Divider style={{marginTop: 2, borderColor: "#006A4E"}} />
              </h1>
              <h1 className="text-library-gray-600 mt-6 text-sm font-semibold">
                {localeString(language, "eventDetailsName")}
              </h1>
              <p className="text-library-gray-600 text-sm">
                {eventDetails?.title}
              </p>
              <h1 className="text-library-gray-600 mt-6 text-sm font-semibold">
                {localeString(language, "eventDetailsLocation")}
              </h1>
              <p className="text-library-gray-600 text-sm">
                {eventDetails?.title}
              </p>
              <h1 className="text-library-gray-600 mt-6 text-sm font-semibold">
                {localeString(language, "eventDetailsDateRange")}
              </h1>
              <p className="text-sm text-library-gray-600">
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.start_date)?.format("D"))
                )}
                {"."}
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.start_date)?.format("MM"))
                )}
                {"."}
                {commaRemover(
                  currencyFormatter(
                    language,
                    parseInt(moment(eventDetails?.start_date)?.format(`YYYY`))
                  )
                )}
                {" - "}
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.end_date)?.format("D"))
                )}
                {"."}
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.end_date)?.format("MM"))
                )}
                {"."}
                {commaRemover(
                  currencyFormatter(
                    language,
                    parseInt(moment(eventDetails?.end_date)?.format(`YYYY`))
                  )
                )}
              </p>
            </div>
            {library ? (
              <div>
                <h1 className="section-title text-base">
                  {localeString(language, "evntLibraryDetails")}
                  <Divider style={{marginTop: 2, borderColor: "#006A4E"}} />
                </h1>
                <div className="bg-library-royal-blue rounded-md p-5 text-library-offWhite">
                  <h1 className="section-title text-sm text-library-offWhite">
                    {localeString(language, "previousQRname")}
                  </h1>
                  <p className="text-sm h-5 mt-1">{library?.name}</p>
                  <h1 className="section-title mt-4 text-sm text-library-offWhite">
                    {localeString(language, "eventHeadl")}
                  </h1>
                  <p className="text-sm mt-1 h-5">
                    {library?.head_of_library?.name}
                  </p>
                  <h1 className="section-title mt-4 text-sm text-library-offWhite">
                    {localeString(language, "eventLdesignation")}
                  </h1>
                  <p className="text-sm mt-1 h-5">
                    {library?.head_of_library?.designation}
                  </p>
                  <h1 className="section-title mt-4 text-sm text-library-offWhite">
                    {localeString(language, "eventRegistrationPhone")}
                  </h1>
                  <p className="text-sm mt-1 h-5">
                    {library?.head_of_library?.phone}
                  </p>
                  <h1 className="section-title mt-4 text-sm text-library-offWhite">
                    {localeString(language, "eventLtelephone")}
                  </h1>
                  <p className="text-sm mt-1 h-5">{library?.phone}</p>
                  <h1 className="section-title mt-4 text-sm text-library-offWhite">
                    {localeString(language, "eventRegistrationEmail")}
                  </h1>
                  <p className="text-sm mt-1 h-5">{library?.email}</p>
                  <h1 className="section-title mt-4 text-sm text-library-offWhite">
                    {localeString(language, "eventLaddress")}
                  </h1>
                  <p className="text-sm mt-1 h-5">{library?.address}</p>
                </div>
                <Link href={`/library/${library?.code}`}>
                  <div className="bookButton">
                    <Button className="button-primary w-full mt-2">
                      {localeString(language, "eventViewmoreButton")}
                    </Button>
                  </div>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </Col>

          <Col
            className="bg-library-white mb-10 lg:mb-20 border border-library-gray-300 rounded-lg"
            xs={{span: 24}}
            lg={{span: 12, offset: 1}}
          >
            <div className="mt-8 mx-8 mb-8">
              <h1 className="font-bold text-base font-['']">
                {localeString(language, "eventRegistrationForm")}
                <Divider style={{margin: 0, borderColor: "#006A4E"}} />
              </h1>
              <div className="mt-7">
                <FormProvider {...methods}>
                  <div onSubmit={methods.handleSubmit(onSubmit)}>
                    <EventRegisterForm
                      eventDetails={eventDetails}
                      slug={slug}
                      setLibrary={setLibrary}
                      language={language}
                      registration_fields={registration_fields}
                    />
                  </div>
                </FormProvider>
              </div>
              {/* <Checkbox className="mt-5 custom-checkbox" onChange={onChange}>
                {localeString(language, "eventRegistrationTerms")}
                <span className="text-library-primary border-b border-library-primary font-bold text-sm">
                  {localeString(language, "eventRegistrationCondition")}
                </span>
              </Checkbox> */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EventRegister;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session: any = await getSession(context);

  const slug = context?.query?.slug;

  const res = await getDetails(
    `/public_library/events/${slug}`,
    "",
    context?.req?.cookies?.["language"] || "bn",
    context?.req?.cookies?.["token"] || ""
  );
  // console.log("====", res);

  const res2: any = await getData(
    `/public_library/events/:${slug}/event_libraries`
  );

  if (res?.success) {
    return {
      props: {
        data: res2?.data,
        eventDetails: res?.data,
        registration_fields: res?.data?.registration_fields,
        language: context?.req?.cookies?.["language"] || "bn",
        token: context?.req?.cookies?.["token"] || "",
      },
    };
  } else {
    return {
      props: {
        eventDetails: [],
      },
    };
  }
};
