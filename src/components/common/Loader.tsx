/** @format */

import { Row, Col } from "antd";
import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen bg-library-white flex items-center justify-center">
      <div>
        <Image src="/loader.gif" alt="App logo" width={150} height={70} />
      </div>
    </div>
  );
};

export default Loader;
