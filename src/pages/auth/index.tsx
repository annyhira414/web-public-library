import { useEffect } from "react";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, [router]);

  return <></>;
};

export default Auth;
