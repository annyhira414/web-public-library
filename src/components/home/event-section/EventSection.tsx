import React, {FC} from "react";
import {Row, Col} from "antd";
import {IEvent} from "@/lib/model/events";
import {EventCard} from "@/components/events/EventCard";
import {localeString} from "@/lib/helpers/utils";
import {AddAnimation} from "@/components/common/AddAnimation";
import {TitleCompoent} from "@/components/common";

interface IEventProps {
  eventData: IEvent[];
  language: string;
}
const EventSection: FC<IEventProps> = ({eventData, language}) => {
  return (
    <>
      {eventData?.length > 0 ? (
        <TitleCompoent
          title={localeString(language, "events")}
          link="/activities/events"
          language={language}
        />
      ) : (
        ""
      )}

      <Row gutter={[25, 25]}>
        {eventData?.map((eventItem) => (
          <Col
            className="mb-10"
            key={eventItem.slug}
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 8}}
            lg={{span: 8}}
            xl={{span: 8}}
            xxl={{span: 8}}
          >
            <AddAnimation>
              <EventCard eventItem={eventItem} />
            </AddAnimation>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default EventSection;
