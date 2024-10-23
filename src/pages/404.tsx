/** @format */
import { Button, Result } from "antd";
import { useRouter } from "next/router";
import React, { FC } from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <Result
      className="lg:h-screen mt-10"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={() => router.push("/")}>Back Home</Button>}
    />
  );
};

export default NotFound;
