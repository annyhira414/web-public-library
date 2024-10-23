import { GetServerSideProps } from "next";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       language: context?.req?.cookies?.["language"] || "en",
//       user_token: context?.req?.cookies?.["token"] || "",
//     },
//   };
// };
