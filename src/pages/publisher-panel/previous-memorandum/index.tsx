import {DataNotFound} from "@/components/common";
import {localeString, scrollToTop} from "@/lib/helpers/utils";
import {IHistory} from "@/lib/model/publisher/index";
import {useRouter} from "next/router";
import React, {FC, useEffect, useState} from "react";
import {Col, Row} from "antd";
import MemorandumDetails from "./memorandum-details";
import {getData} from "@/lib/services";
import Cookies from "js-cookie";
import {DatePicker} from "@/components/controls";
import {useForm} from "react-hook-form";
import dayjs from "dayjs";
import {PreviousMemorandumCard, Deshboard} from "@/components/publisher-panel";

interface IHistoryProps {
  total: string;
  totalPage?: string | undefined;
}

const History: FC<IHistoryProps> = ({total: totalData, totalPage}) => {
  let router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<any>({
    defaultValues: {
      // tender_session: router?.query?.tender_session ? router?.query?.tender_session : "",
    },
    mode: "all",
  });

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDetailsId, setIsDetailsId] = useState<number>();
  const [memorandumList, setMemorandumList] = useState<IHistory[]>([]);
  const [history, setHistory] = useState<IHistory>();
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const tenderSession = watch("tender_session")?.$y;
  const language = Cookies.get("language");

  useEffect(() => {
    setTotal(parseInt(totalData));
    let tender_session: any = tenderSession
      ? dayjs(tenderSession?.toString()).format("YYYY")
      : "";
    router.push({
      pathname: "previous-memorandum",
      query: {
        page,
        tender_session,
      },
    });
    if (tender_session) {
      setPage(1);
    }

    if (page > parseInt(tender_session)) {
      setPage(1);
    }
    getMemorandumList();
    scrollToTop();
  }, [totalData, page, tenderSession]);

  const getMemorandumList = async () => {
    let params;
    if (tenderSession) {
      params = {
        tender_session: `${tenderSession}-${tenderSession + 1}`,
      };
    }

    const res = await getData(
      `public_library/memorandum_publishers`,
      params,
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setMemorandumList(res?.data || []);
    } else {
      setMemorandumList([]);
    }
  };

  const startIndex = (page - 1) * perPage;

  return (
    <>
      <div className="pl-content-container ">
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
            {!isDetailsOpen ? (
              <div className="pb-16 md:pt-12 pt-0">
                <div className="mb-10 justify-between flex">
                  <h1 className="section-title pt-2">
                    {localeString(language, "memorandum")}
                  </h1>
                  <div className="md:gap-2 flex-col md:flex-row lg:mt-0 lg:pl-64">
                    <form>
                      <div>
                        <DatePicker
                          name="tender_session"
                          control={control}
                          format="YYYY"
                          placeholder={localeString(language, "yearpublisher")}
                          picker="year"
                          allowClear={true}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pb-8">
                  <>
                    {memorandumList?.length > 0 ? (
                      <>
                        {memorandumList?.map(
                          (history: IHistory, index: number) => (
                            <div
                              key={history?.id}
                              onClick={() => {
                                setIsDetailsOpen(true);
                                setIsDetailsId(history?.id);
                                setHistory(history);
                              }}
                              className="cursor-pointer"
                            >
                              <PreviousMemorandumCard
                                url=""
                                index={index}
                                language={language}
                                history={history}
                                startIndex={startIndex}
                              />
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <div className="pt-2">
                        <DataNotFound
                          title={localeString(language, "noData")}
                        />
                      </div>
                    )}
                  </>
                </div>
              </div>
            ) : (
              <div>
                <MemorandumDetails
                  id={isDetailsId}
                  setIsDetailsOpen={setIsDetailsOpen}
                  history={history}
                />
              </div>
            )}
            {/* <div className="py-10">
              <Pagination
                defaultCurrent={1}
                current={
                  router?.query?.page
                    ? parseInt(router?.query?.page as string)
                    : 1
                }
                defaultPageSize={perPage}
                total={total || 0}
                onChange={handlePageChange}
                showSizeChanger={false}
                responsive
              />
            </div> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default History;
