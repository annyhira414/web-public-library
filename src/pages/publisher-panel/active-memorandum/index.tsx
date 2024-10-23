import React, {FC, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Row, Col} from "antd";
import {QuickScrollToTop, localeString} from "@/lib/helpers/utils";
import {getData} from "@/lib/services";
import {IMemorandumData, IbookTable} from "@/lib/model/publisher";
import {
  AddBook,
  AddBookTable,
  AddBookCreate,
  UpdateBook,
  Deshboard,
} from "@/components/publisher-panel";

interface IAddBook {
  language: string | undefined;
}

const MainAddBook: FC<IAddBook> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  const [isFrom, setIsFrom] = useState(false);

  const [memorandumsData, setMemorandumsData] = useState<IMemorandumData>();
  const [listData, setListData] = useState<IbookTable[]>([]);
  const [listID, setListID] = useState("");

  const onCancel = () => {
    setIsFrom(false);
    setListID("");
    QuickScrollToTop();
  };

  useEffect(() => {
    getMemorandumsData();
  }, []);

  const getMemorandumsData = async () => {
    const res = await getData(
      `public_library/memorandums/latest`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setMemorandumsData(res?.data);
      getListData(res?.data?.id);
    }
  };

  const getListData = async (id: number) => {
    const param = {memorandum_id: id};
    const res = await getData(
      `public_library/publisher_biblios`,
      param,
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setListData(res?.data);
    }
  };

  const [detailsData, setDetailsData] = useState();

  const getDetailsData = async (listID: string) => {
    const res: any = await getData(
      `public_library/publisher_biblios/${listID}`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setDetailsData(res?.data);
    }
  };
  useEffect(() => {
    listID && getDetailsData(listID);
  }, [listID]);

  return (
    <>
      <div className="pl-content-container pb-12">
        <Row gutter={[16, 25]}>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 6}}
            lg={{span: 6}}
            xl={{span: 6}}
            xxl={{span: 6}}
          >
            <Deshboard language={language} />
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 18}}
            lg={{span: 16}}
            xl={{span: 18}}
            xxl={{span: 18}}
          >
            <div className="lg:pt-14 md:pt-14">
              {!memorandumsData ? (
                <div className="lg:pl-10 w-full xl:w-10/12 md:pl-4">
                  <h3 className="text-left section-title md:pt-12">
                    {localeString(language, "activeMemorandum")}
                  </h3>
                  <p className="pt-12">
                    {localeString(language, "noActiveMemorandum")}
                  </p>
                </div>
              ) : listID ? (
                <UpdateBook
                  getListData={getListData}
                  onCancel={onCancel}
                  memorandumsData={memorandumsData}
                  detailsData={detailsData}
                />
              ) : isFrom ? (
                <>
                  <AddBookCreate
                    memorandumsData={memorandumsData}
                    detailsData={detailsData}
                    onCancel={onCancel}
                    getListData={getListData}
                  />
                </>
              ) : (
                <>
                  <div>
                    <AddBook
                      memorandumsData={memorandumsData}
                      setIsFrom={setIsFrom}
                      setListID={setListID}
                    />
                  </div>
                  <div className="">
                    <AddBookTable
                      listData={listData}
                      getListData={getListData}
                      setListID={setListID}
                      setListData={setListData}
                      memorandumsData={memorandumsData}
                    />
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MainAddBook;
