import Image from "next/image";
import {useRouter} from "next/router";
import {Avatar, Popover, Badge, message, Button} from "antd";
import {useBoolean} from "usehooks-ts";
import {Notification, UserMenuDialog} from "@/components/header";
import {BookBorrowBag} from "@/components/header";
import {HiShoppingBag} from "react-icons/hi2";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import {FC, useEffect, useState} from "react";
import {IoNotifications} from "react-icons/io5";
import {deleteData, getData} from "@/lib/services";
import {useDispatch, useSelector} from "react-redux";
import type {AppState} from "../../redux/store";
import {addtoBag} from "@/redux/features/add-to-bag/addToBagSlice";
import {refatchCountNotification} from "@/redux/features/counter/counterSlice";

interface IHeaderLoginProps {
  language: string | undefined;
}

export const HeaderLogin: FC<IHeaderLoginProps> = ({language}) => {
  const router = useRouter();
  const userToken = Cookies.get("token");
  const dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const {value: isOpenGlobalSearch, toggle: toggleGlobalSearch} = useBoolean();

  const goToMemeber = () => {
    router.push("/membership/membership-plans");
  };
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    userToken && getCount();
  }, [userToken]);
  const notificationCount = useSelector(
    (state: AppState) => state?.notificationCount.value
  );
  useEffect(() => {
    userToken && getCount();
  }, [notificationCount]);

  const getCount = async () => {
    const res = await getData(
      "/public_library/notifications/count",
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setNotificationData(res?.data);
    }
  };
  const bookCart = useSelector((state: AppState) => state?.bag?.data);

  const deleteCart = async (id: any) => {
    const res = await deleteData(
      `public_library/carts/remove?cart_item_id=${id}`,
      "",
      Cookies.get("token")
    );
    if (res?.success) {
      const updatedData = bookCart.filter((user: any) => user?.id !== id);
      // setBookCart1(updatedData);
      dispatch(addtoBag(updatedData));
    }
  };

  const getProfileDetails = async () => {
    const res = await getData(
      `public_library/users/profile
    `,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setUserDetails(res?.data);
    } else {
      messageApi.open({
        type: "error",
        content: <p>{localeString(language, "userNotFound")}</p>,
      });
    }
  };
  useEffect(() => {
    if (userToken) {
      getProfileDetails();
    }
  }, []);
  
  return (
    <div>
      {contextHolder}
      <div className="flex gap-4 justify-end">
        {userToken ? (
          <div className="bookButton">
            <Button href="/enter-library" className="button-primary pt-2">
              {localeString(language, "enterTheLibrary")}
            </Button>
          </div>
        ) : (
          // <Link
          //   href="/enter-library"
          //   className="flex items-center gap-2 cursor-pointer"
          // >
          //   <span className="border py-1 px-2 md:py-2 md:px-4 lg:py-2 lg:px-4 xl:py-2 xl:px-4 xxl:py-2 xxl:px-4 text-library-primary rounded border-library-primary">
          //     {localeString(language, "enterTheLibrary")}
          //   </span>
          // </Link>
          <div className="borrowBookButton">
            <Button
              href="/auth/register"
              className="button-secondary px-2 py-2 font-semibold"
            >
              {localeString(language, "signup")}
            </Button>
          </div>
          // <Link
          //   href="/auth/register"
          //   className="rounded bg-library-primary -mt-1 "
          // >
          //   <span className="px-2 py-2 uppercase text-sm font-semibold  text-library-white hover:text-library-white block ">
          //     {localeString(language, "signup")}
          //   </span>
          // </Link>
        )}

        <div className="cursor-pointer">
          {userToken ? (
            <div className="flex gap-4">
              <Popover
                className="pop"
                placement="bottom"
                content={Notification}
                trigger="click"
                onOpenChange={(state) => {
                  if (state) {
                    dispatch(refatchCountNotification());
                  }
                }}
              >
                {/* {notificationData && notificationData > 0 ? ( */}
                <div>
                  <div>
                    <Badge count={notificationData?.count} size="small">
                      <IoNotifications className="w-6 h-8" />
                    </Badge>
                  </div>
                </div>
                {/* ) : (
                  <>
                    <IoNotifications className="w-6 h-8" />
                  </>
                )} */}
              </Popover>
              <Popover
                className=""
                placement="bottom"
                content={
                  <BookBorrowBag bookCart={bookCart} deleteCart={deleteCart} />
                }
                trigger="click"
              >
                <Badge count={bookCart?.length} size="small">
                  <HiShoppingBag className="w-7 h-7 text-library-primary" />
                </Badge>
              </Popover>

              <div className="login-popover">
                <Popover
                  open={open}
                  placement="bottom"
                  content={<UserMenuDialog hide={hide} />}
                  trigger="click"
                  onOpenChange={handleOpenChange}
                >
                  {userDetails?.profile_image_url ? (
                    <div className="header-profile-img">
                      <Avatar
                        className="cursor-pointer"
                        size={35}
                        icon={
                          <Image
                            src={userDetails?.profile_image_url}
                            alt="App logo"
                            width={35}
                            height={35}
                            className="rounded-full border border-gray-300 p-1 bg-library-white"
                          />
                        }
                      />
                    </div>
                  ) : (
                    <Avatar
                      className="cursor-pointer"
                      size={30}
                      icon={
                        <Image
                          src="/icons/user.png"
                          alt="App logo"
                          width={28}
                          height={28}
                        />
                      }
                    />
                  )}
                </Popover>
              </div>
            </div>
          ) : (
            <div className="borrowBookButton">
              <Button
                href="/auth/login"
                className="button-secondary px-2 py-2 font-semibold"
              >
                {localeString(language, "logged")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
