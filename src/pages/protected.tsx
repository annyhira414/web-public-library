import { NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession, getSession, signIn } from "next-auth/react";

const Protected = () => {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      }
    };

    securePage();
  });

  if (status === "loading") {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <h2>This page is protected for special people</h2>
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default Protected;
