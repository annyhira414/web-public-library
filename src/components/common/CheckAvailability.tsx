import { FC, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";
import sorryImage from "../../../public/images/sorry.svg";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Link from "next/link";
import {
  BookNotFound,
  BookRequestModal,
  CheckLibrary,
  Congratulations,
} from "../book/modal-status";

type ILibrary = {
  label: string;
  value: string;
};

type IData = {
  is_available?: boolean;
  library_name?: string;
  shelves?: string[];
};

interface ICheckAvailability {
  isModalVisible?: boolean;
  toggleModal?: () => void;
  isDisabled?: boolean;
  control?: any;
  handleSubmit?: (value: any) => any;
  onSubmit?: (value: any) => void;
  status?: string;
  libraryName?: string;
  selfNumber?: string;
  slug?: string;
  setModalStatus?: (value: string) => void;
  allLibrary?: ILibrary[];
  data?: Partial<IData>;
  congratulationMessage: string;
  isNormal?: boolean;
  buttonText?: string;
  maskClosable?: boolean;
}
const CheckAvailability: FC<ICheckAvailability> = ({
  isModalVisible,
  toggleModal,
  control,
  handleSubmit,
  onSubmit,
  isDisabled = true,
  status,
  slug = "",
  setModalStatus,
  allLibrary = [],
  data,
  congratulationMessage = "",
  isNormal = false,
  buttonText = "ok",
  maskClosable = true,
}) => {
  const language = Cookies.get("language");
  return (
    <Modal
      open={isModalVisible}
      onOk={toggleModal}
      onCancel={toggleModal}
      className="check-availability"
      width={630}
      maskClosable={false}
    >
      {status === "select-library" ? (
        <CheckLibrary
          control={control}
          allLibrary={allLibrary}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          data={data}
        />
      ) : status === "congratulations" ? (
        <Congratulations
          control={control}
          congratulationMessage={congratulationMessage}
          allLibrary={allLibrary}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          data={data}
          isNormal={isNormal}
          buttonText={buttonText}
        />
      ) : status === "request" ? (
        <BookRequestModal
          control={control}
          allLibrary={allLibrary}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      ) : (
        <BookNotFound
          setModalStatus={setModalStatus}
          slug={slug}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  );
};
export default CheckAvailability;
