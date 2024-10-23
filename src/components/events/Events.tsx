import {FC} from "react";
import {Row, Col} from "antd";
import {EventCard} from "./EventCard";
import {localeString} from "@/lib/helpers/utils";
import {IEvent} from "@/lib/model/events";

interface ItemEvent {
  ongoingData: IEvent[];
  UpcomingData: IEvent[];
  completedData: IEvent[];
  language: string;
}

export const Events: FC<ItemEvent> = ({
  language,
  ongoingData,
  UpcomingData,
  completedData,
}) => {
  let setOngoingData = ongoingData?.slice(0, 3);
  let setUpcomingData = UpcomingData?.slice(0, 3);
  return (
    <div className="pl-content-container">
      <div>
        {ongoingData?.length > 0 ? (
          <section className="min-h-[590px]">
            <h1 className="section-title mt-10">
              {localeString(language, "ongoingEvents")}
            </h1>
            <Row gutter={[25, 25]}>
              {setOngoingData?.map((eventItem: IEvent) => (
                <Col
                  className="mt-10"
                  xs={{span: 24}}
                  sm={{span: 12}}
                  md={{span: 8}}
                  lg={{span: 8}}
                  xl={{span: 8}}
                  key={eventItem.slug}
                >
                  <EventCard eventItem={eventItem} />
                </Col>
              ))}
            </Row>
          </section>
        ) : (
          <></>
        )}
      </div>
      <div>
        <h1 className="section-title mt-10">
          {localeString(language, "upcomingEvents")}
        </h1>
        {UpcomingData?.length > 0 ? (
          <section className="min-h-[590px]">
            <Row gutter={[25, 25]}>
              {setUpcomingData?.map((eventItem: IEvent) => (
                <Col
                  className="mt-10"
                  xs={{span: 24}}
                  sm={{span: 12}}
                  md={{span: 8}}
                  lg={{span: 8}}
                  xl={{span: 8}}
                  key={eventItem.slug}
                >
                  <EventCard eventItem={eventItem} />
                </Col>
              ))}
            </Row>
          </section>
        ) : (
          <>
            <h1 className="text-xl flex justify-center mt-20 mb-20 text-library-gray ">
              {localeString(language, "noEventmsg")}
            </h1>
          </>
        )}
      </div>
      <div className="" id="past">
        <h1 className="section-title mt-10">
          {localeString(language, "pastEvents")}
        </h1>
        {completedData?.length > 0 ? (
          <>
            <Row gutter={[25, 25]}>
              {completedData?.map((eventItem: IEvent) => (
                <Col
                  className="mt-10"
                  xs={{span: 24}}
                  sm={{span: 12}}
                  md={{span: 8}}
                  lg={{span: 8, offset: 0}}
                  key={eventItem.slug}
                >
                  <EventCard eventItem={eventItem} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <h1 className="text-xl flex justify-center mt-20 mb-24 text-library-gray ">
              {localeString(language, "noPastEvents")}
            </h1>
          </>
        )}
      </div>
    </div>
  );
};
