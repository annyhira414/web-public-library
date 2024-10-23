import React, {FC} from "react";
import {Row, Col} from "antd";
import {BookCard} from "@/components/book/BookCard";
import Link from "next/link";
import {IBook} from "@/lib/model/books";
import {localeString} from "@/lib/helpers/utils";
import {AddAnimation} from "@/components/common/AddAnimation";
import {TitleCompoent} from "@/components/common";

interface ItemBook {
  bookData: IBook[];
  language: string;
}
export const DiscoverBooks: FC<ItemBook> = ({bookData, language}) => {
  return (
    <>
      <TitleCompoent
        title={localeString(language, "discoverBooks")}
        language={language}
        link="/books"
      />
      <div>
        <Row gutter={[25, 25]}>
          {bookData?.map((bookItem) => (
            <Col
              key={bookItem.id}
              xs={{span: 24}}
              sm={{span: 24}}
              md={{span: 12}}
              lg={{span: 8}}
              xl={{span: 6}}
              xxl={{span: 6}}
            >
              <AddAnimation>
                <BookCard bookItem={bookItem} />
              </AddAnimation>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
