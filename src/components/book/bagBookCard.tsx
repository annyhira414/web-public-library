import { FC } from "react";
import { Typography } from "antd";
import { Select } from "@/components/controls";
import { Row, Col } from "antd";
import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import NoImageFound from "../../../public/images/book-page/noImageFound.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteData } from "@/lib/services";
import { useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addtoBag } from "@/redux/features/add-to-bag/addToBagSlice";
const { Text } = Typography;
interface bagItems {
  bookCart?: any;
  control?: any;
  availableData?: any;
}

const BagBookCard: FC<bagItems> = ({ bookCart, control, availableData }) => {
  const language = Cookies.get("language");
  const dispatch = useDispatch();

  const deleteCart = async (id: any) => {
    const res = await deleteData(
      `public_library/carts/remove?cart_item_id=${id}`,
      "",
      Cookies.get("token")
    );
    if (res?.success) {
      const updatedData = bookCart.filter((user: any) => user?.id !== id);
      dispatch(addtoBag(updatedData));
    }
  };

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "lineItems",
    });

  return (
    <Row className="mt-10 bg-library-white rounded">
      <Col
        className="lg:ml-10 mt-5"
        xs={{ span: 22, offset: 1 }}
        lg={{ span: 22 }}
      >
        <h1 className="mb-5 section-title text-xl">
          {localeString(language, "borrowSummary")}
        </h1>

        <div>
          {bookCart.length > 0 ? (
            <div>
              {bookCart?.map((user: any, i: number) => (
                <div
                  key={i}
                  className={` ${
                    !availableData?.[i]?.is_available ? "bg-[#FFF3F3]" : ""
                  }  px-5 py-8 mb-5 bag-card-dessign`}
                >
                  <div className="borrowAntcard mt-3 mb-2 bg-inherit">
                    <Row>
                      <Col lg={{ span: 18 }} xs={{ span: 20 }} className="flex">
                        <div>
                          <Image
                            src={
                              bookCart[i]?.image_url?.desktop_image
                                ? bookCart[i]?.image_url?.tab_image
                                : NoImageFound
                            }
                            alt="Card book image"
                            height={100}
                            width={100}
                          />
                        </div>
                        <div className="ml-2">
                          <h2 className="section-title text-sm lg:text-base font-semibold text-library-gray-700">
                            {bookCart[i]?.title}
                          </h2>
                          <h3 className="mt-1 text-xs text-library-gray-700">
                            {bookCart[i]?.authors?.map(
                              (user: any, i: number) => user?.full_name
                            )}
                          </h3>
                        </div>
                      </Col>
                      <Col lg={{ span: 2, offset: 4 }} xs={{ span: 2 }}>
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              remove(i);
                              deleteCart(bookCart[i]?.id);
                            }}
                          >
                            <RiDeleteBinLine className="cursor-pointer rounded-full text-library-gray text-lg" />
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {!availableData?.[i]?.is_available && (
                    <>
                      <h1 className="section-title text-xl mt-5 mb-3">
                        {localeString(language, "selectLibraryFromList")}
                      </h1>
                      <Select
                        name={`lineItems.${i}.availavleLibraryForBook`}
                        control={control}
                        allowClear={false}
                        options={availableData?.[i]?.available_libraries?.map(
                          (item: any) => ({
                            value: item?.id,
                            label: item?.name,
                          })
                        )}
                        placeholder={localeString(
                          language,
                          "EnterLibrarySelect"
                        )}
                        className="h-10"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h1 className="mb-5">{localeString(language, "emptyBag")}</h1>
          )}
        </div>
      </Col>
    </Row>
  );
};
export default BagBookCard;
