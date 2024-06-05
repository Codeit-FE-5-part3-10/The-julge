import { axiosInstance } from "./axiosInstance";
import { items } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { testId } from "./constant";

export interface getApplicationType {
  (
    setApplications: Dispatch<SetStateAction<items>>,
    setTotal: Dispatch<SetStateAction<number>>,
    page: number,
    countPerPage: number
  ): void;
}

export const GetApplicationsByShopByNotice: getApplicationType = async (
  setApplications,
  setTotal,
  page,
  countPerPage
) => {
  const response = await axiosInstance.get(
    `/shops/${testId.shop}/notices/${testId.notice}/applications?offset=${
      (page - 1) * countPerPage
    }&limit=${countPerPage}`
  );
  const data = await response.data;

  setApplications(data.items);
  setTotal(Math.ceil(data.count / countPerPage));

  return;
};

export const GetApplicationsByUser: getApplicationType = async (
  setApplications,
  setTotal,
  page,
  countPerPage
) => {
  const response = await axiosInstance.get(
    `/users/${testId.user}/applications?offset=${
      (page - 1) * countPerPage
    }&limit=${countPerPage}`
  );
  const data = await response.data;

  setApplications(data.items);
  setTotal(Math.ceil(data.count / countPerPage));

  return;
};
