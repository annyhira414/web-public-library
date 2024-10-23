import React, { FC } from "react";
import { Row, Col } from "antd";
import { BookCard } from "@/components/book/BookCard";
import Link from "next/link";
import { IBook } from "@/lib/model/books";
import { localeString } from "@/lib/helpers/utils";
import { AddAnimation } from "@/components/common/AddAnimation";

import { TitleCompoent } from "@/components/common";

interface ItemBook {
  eBooks: IBook[];
  language: string;
}

export const EBooks: FC<ItemBook> = ({ eBooks, language }) => {
  return (
    <>
      <TitleCompoent
        title={localeString(language, "eBooks")}
        link="/e-books"
        language={language}
      />
      <div>
        <Row gutter={[25, 25]}>
          {eBooks?.map((bookItem) => (
            <Col
              key={bookItem.slug}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            >
              <AddAnimation>
                <BookCard bookItem={bookItem} url="e-books" />
              </AddAnimation>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
