import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ConfigProvider, Rate, message } from "antd";
import { RootLayout } from "@/components/layouts";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

function AppMain({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const authToken = Cookies.get("token" || "");
  const currentDomain = router.pathname;

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = authToken || "";
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          Cookies.remove("token");
          Cookies.remove("id");
          Cookies.remove("fullName");
          Cookies.remove("email");
          Cookies.remove("phone");
          Cookies.remove("dob");
          Cookies.remove("gender");
          Cookies.remove("isMember");
          Cookies.remove("membershipStatus");
          Cookies.remove("member_activated_at");
          Cookies.remove("libraryCode");
          Cookies.remove("libraryId");
          router.push("/auth/login");
        } else if (error?.response?.status === 500) {
        } else {
          return error.response;
        }
      }
    );
  }, [currentDomain]);
  return (
    <div className="main-container">
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
      </Head>
      <SessionProvider session={pageProps?.session}>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#002A1F",
                fontFamily: "Poppins",
              },

              components: {
                Rate: {
                  colorFillContent: "#E2E3E7",
                },
                Button: {
                  colorBgTextHover: "#FFFFFF",
                },
              },
            }}
          >
            <RootLayout language={pageProps?.language} token={pageProps?.token}>
              <Component {...pageProps} />
            </RootLayout>
          </ConfigProvider>
        </Provider>
      </SessionProvider>
    </div>
  );
}

AppMain.getInitialProps = async (context: any) => {
  return {
    props: {
      language: context?.ctx?.req?.cookies?.["language"] || "en",
      user_token: context?.ctx?.req?.cookies?.["token"] || "",
    },
  };
};
export default AppMain;
