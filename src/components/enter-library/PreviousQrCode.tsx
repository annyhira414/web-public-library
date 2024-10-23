import React, { FC, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { QrCard } from "./QrCard";
import { Pagination } from "antd";
import { localeString } from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services";
import Cookies from "js-cookie";
import { IQrCode } from "@/lib/model/user/enter-library";
import { useRouter } from "next/router";
import { DataNotFound, Loader } from "../common";

interface IEnterLibrary {
  language: string | undefined;
}
const PreviousQrCode: FC<IEnterLibrary> = ({ language }) => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [user, setUser] = useState<IQrCode[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQrcode();
  }, [page]);

  const getQrcode = async () => {
    setLoading(true);
    try {
      const res: any = await getPaginatedData(
        "/public_library/user_qr_codes",
        { per_page: perPage, page: page },
        language,
        Cookies.get("token")
      );
      if (res?.success) {
        setUser(res?.data?.data);
        setTotalPages(parseInt(res?.data?.headers["x-total"]));
        setPage(parseInt(res?.data?.headers["x-page"]));
        setLoading(false);
      } else {
        if (res.status === 401) {
          router.push("/auth/login");
        }
      }
    } catch (error) {}
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="section-title text-xl">
            {localeString(language, "previousQRCode")}
          </h1>
          {user?.length > 0 ? (
            <>
              <Row className="mt-5">
                {user?.map((user: IQrCode, i: number) => (
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    xl={{ span: 20 }}
                    key={user.id}
                  >
                    <QrCard language={language} key={user.id} QrCode={user} />
                  </Col>
                ))}
              </Row>
              <div className="mt-8 mb-28">
                <Pagination
                  total={totalPages}
                  showSizeChanger={false}
                  pageSize={perPage}
                  defaultCurrent={1}
                  current={page}
                  onChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="mt-5 mb-24">
              <DataNotFound title={localeString(language, "noQrCodesFound")} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default PreviousQrCode;
