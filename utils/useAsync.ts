import { useState } from "react";
import type { AxiosResponse } from "axios";
import { allType } from "@/types/types";

export interface asyncFunctionType {
  (): Promise<AxiosResponse<allType>>;
}

interface useAsyncType {
  (asyncFunction: asyncFunctionType): {
    loading: boolean;
    error: any;
    data: allType | null;
  };
}

export const useAsync: useAsyncType = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<allType | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response: AxiosResponse<allType> = await asyncFunction();
      const body = response?.data;
      setData(body);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  execute();

  return { loading, error, data };
};
