// TODO: 공고 수정할 때 뜯어고칠것

import { axiosInstance } from './axiosInstance';
import { Dispatch, SetStateAction } from 'react';
import { TEST_ID } from '../utils/constant';
import { items } from '../types/types';

export interface getApplicationType {
  (
    setApplications: Dispatch<SetStateAction<items>>,
    setTotal: Dispatch<SetStateAction<number>>,
    page: number,
    countPerPage: number
  ): void;
}

export const getApplicationsByShopByNotice: getApplicationType = async (
  setApplications,
  setTotal,
  page,
  countPerPage
) => {
  const response = await axiosInstance.get(
    `/shops/${TEST_ID.shop}/notices/${TEST_ID.notice}/applications?offset=${
      (page - 1) * countPerPage
    }&limit=${countPerPage}`
  );
  const data = await response.data;

  setApplications(data.items);
  setTotal(Math.ceil(data.count / countPerPage));

  return;
};

export const getApplicationsByUser: getApplicationType = async (
  setApplications,
  setTotal,
  page,
  countPerPage
) => {
  const response = await axiosInstance.get(
    `/users/${TEST_ID.user}/applications?offset=${(page - 1) * countPerPage}&limit=${countPerPage}`
  );
  const data = await response.data;

  setApplications(data.items);
  setTotal(Math.ceil(data.count / countPerPage));

  return;
};
