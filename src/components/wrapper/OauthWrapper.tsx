import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FullPageLoading from "../loading/FullPageLoading";
import axios, { AxiosError } from "axios";

interface UserResponse {
  user: {
    user: any | null;
    token: string;
  } | null;
  error: AxiosError | null;
}

const OauthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (user) {
        push("/admin/investors");

        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return <FullPageLoading />;
  }

  return <div>{children}</div>;
};

export default OauthWrapper;

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
