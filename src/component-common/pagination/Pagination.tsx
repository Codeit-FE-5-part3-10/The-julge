import { usePagination } from "@mantine/hooks";

export default function Pagination(params) {
  const pagination = usePagination({ total: 10, initialPage: 1 });
}
