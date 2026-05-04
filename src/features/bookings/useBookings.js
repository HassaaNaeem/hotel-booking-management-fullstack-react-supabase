import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue == "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "status", value: filterValue, method: 'gte' };

  // SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  // PAGINAION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // whenever filter changes, react query will refetch the data
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });
  const bookings = data?.data;
  const count = data?.count;

  // PRE FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // whenever filter changes, react query will refetch the data
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // whenever filter changes, react query will refetch the data
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
