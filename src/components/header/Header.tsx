import { motion, useAnimation, useInView } from "framer-motion";
import {
  HeaderMenus,
  HeaderLogin,
  HeaderTop,
  MenuDrawer,
} from "@/components/header";
import { useMediaQuery } from "usehooks-ts";
import { useBoolean } from "usehooks-ts";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
interface HeaderProps {
  language: string | undefined;
  token: string | undefined;
}
export const Header = ({ language, token }: HeaderProps) => {
  const { value: isDrawerOpen, toggle: toggleDrawer } = useBoolean(false);
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.75, delay: 0.25 }}
    >
      <div className="header-menu border-b border-[#CFD0D2] bg-library-order-sidebar-background w-full">
        <div className="main-container">
          <HeaderTop language={language} />
        </div>
        <Row className="content-container-header flex justify-between ">
          <Col
            xs={0}
            sm={0}
            md={14}
            lg={16}
            xl={17}
            className="pt-2 2xl:px-0 h-16 "
          >
            <HeaderMenus language={language} />
          </Col>
          <div className="sm:static md:hidden lg:hidden m-2">
            <button className="text-3xl" onClick={toggleDrawer}>
              <UnorderedListOutlined />
            </button>
          </div>
          <Col className="py-3" xs={20} sm={20} md={10} lg={8} xl={7}>
            <HeaderLogin language={language} />
          </Col>
        </Row>
        {!matches && (
          <div className="responsive-menu">
            <MenuDrawer
              language={language}
              isDrawerOpen={isDrawerOpen}
              toggleDrawer={toggleDrawer}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
