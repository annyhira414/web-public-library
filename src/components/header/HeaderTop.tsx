import {useEffect, useState} from "react";
import {Select, Row, Col} from "antd";
import {HeaderIcon, HeaderSearchNew} from "@/components/header";
import {Input} from "antd";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {useMediaQuery} from "usehooks-ts";
import {BiSearch} from "react-icons/bi";
const {Search} = Input;

interface HeaderTopProps {
  language: string | undefined;
}

export const HeaderTop = ({language}: HeaderTopProps) => {
  if (language) {
    language = language;
  } else {
    language = Cookies.get("language");
  }

  const router = useRouter();
  const LANGUAGES = [
    {id: 1, label: "ENG", value: "en"},
    {id: 2, label: "বাংলা", value: "bn"},
  ];
  const width = useMediaQuery("(min-width: 768px)");
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isExpandSearch, setIsExpandSearch] = useState(false);

  useEffect(() => {
    if (width) {
      setIsExpandSearch(false);
      setIsShowSearch(false);
    } else {
      setIsShowSearch(true);
    }
  }, [width]);

  const handleExpandSearch = () => {
    setIsShowSearch(false);
    setIsExpandSearch(true);
  };

  return (
    <div className="header-top bg-library-primary pb-3 ">
      <Row className="content-container-header md:content-container lg:content-container xl:content-container xxl:content-container  pt-3">
        <Col
          xs={isExpandSearch ? 0 : 17}
          sm={isExpandSearch ? 0 : 17}
          md={10}
          lg={10}
          xl={10}
          xxl={10}
          className="flex items-center"
        >
          {!isExpandSearch && <HeaderIcon language={language} />}
        </Col>
        <Col
          xs={isExpandSearch ? 24 : 7}
          sm={isExpandSearch ? 24 : 7}
          md={14}
          lg={14}
          xl={14}
          xxl={14}
        >
          <Row>
            <Col
              xs={isExpandSearch ? 24 : 12}
              sm={isExpandSearch ? 24 : 12}
              md={20}
              lg={20}
              xl={20}
              xxl={20}
            >
              {isShowSearch ? (
                <div className="flex justify-end pr-6 md:pr-0  mt-1">
                  <BiSearch
                    size={28}
                    className="cursor-pointer text-white"
                    onClick={handleExpandSearch}
                  />
                </div>
              ) : (
                <div className="mt-3">
                  <HeaderSearchNew
                    isExpandSearch={isExpandSearch}
                    setIsExpandSearch={setIsExpandSearch}
                    setIsShowSearch={setIsShowSearch}
                  />
                </div>
              )}
            </Col>

            <Col
              xs={isExpandSearch ? 0 : 12}
              sm={isExpandSearch ? 0 : 12}
              md={4}
              lg={4}
              xl={4}
              xxl={4}
            >
              <div className="flex justify-end md:pt-4 language-box">
                <Select
                  className="language-style w-18"
                  defaultValue={language}
                  bordered={true}
                  options={LANGUAGES}
                  onChange={(e) => {
                    Cookies.set("language", e, {expires: 1000 * 60});
                    router.reload();
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
