import { FC, ReactNode, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getData } from "@/lib/services";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addtoBag } from "@/redux/features/add-to-bag/addToBagSlice";
import { useRouter } from "next/router";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
interface RootLayoutProps {
  children: ReactNode;
  language: string;
  token: string | undefined;
}
export const RootLayout: FC<RootLayoutProps> = ({
  children,
  language,
  token,
}) => {
  let { locale, pathname } = useRouter();

  let MyLanguage: string | undefined;
  if (language) {
    MyLanguage = language;
  } else {
    MyLanguage = Cookies.get("language");
  }
  const [isAppRendered, setIsAppRendered] = useState(false);
  useEffect(() => {
    setIsAppRendered(true);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    token && getBookCart();
  }, [token]);

  const getBookCart = async () => {
    const res = await getData(
      `public_library/carts/details`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      dispatch(addtoBag(res?.data?.cart_items));
      // setBookCart1(res?.data?.cart_items);
    }
  };

  return isAppRendered ? (
    <>
      <Header language={MyLanguage} token={token} />
      <main className="main-container">{children}</main>
      <Footer language={MyLanguage} />
    </>
  ) : (
    <></>
  );
};

// commented code
//   pathname === "/auth/login" ? (
//     <Login />
//   ) : pathname === "/auth/register" ? (
//     <Register />
//   ) : (
//     <>
//       <Header language={MyLanguage} token={token} />
//       <main className="main-container">{children}</main>
//       <Footer language={MyLanguage} />
//     </>
//   )
// ) : (
//   <></>
