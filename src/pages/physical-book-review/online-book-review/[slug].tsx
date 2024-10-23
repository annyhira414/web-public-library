import {FC} from "react";
import {Modal, Rate} from "antd";
import Image from "next/image";

interface ISingleReview {
  isModalVisible?: boolean;
  toggleModal?: any;
  popUpProps: any;
}
const SingleReview: FC<ISingleReview> = ({
  isModalVisible,
  popUpProps,
  toggleModal,
}) => {
  return (
    <>
      <Modal
        open={isModalVisible}
        onOk={toggleModal}
        onCancel={toggleModal}
        className="check-availability"
        width={630}
      >
        <div className="lg:py-16 lg:px-4 md:px-24">
          <div className="mb-6 flex  ">
            {/* <div>
              <Image
                className="w-8 h-8 rounded-full "
                src={
                  popUpProps?.icon ? popUpProps?.icon : "/icons/review/user.png"
                }
                alt="Neil image"
                width={32}
                height={32}
              />
            </div> */}
            <div className="pl-4 ">
              <div className="text-base font-bold">
                {popUpProps?.biblio?.title}
              </div>
              <div className="text-sm pt-4">
                <Rate
                  disabled
                  defaultValue={popUpProps?.rating}
                  className="font-semibold text-sm  "
                />
              </div>
            </div>
          </div>
          <p className="pl-4 pt-4">{popUpProps?.text}</p>
        </div>
      </Modal>
    </>
  );
};

export default SingleReview;
