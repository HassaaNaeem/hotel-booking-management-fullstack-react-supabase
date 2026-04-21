import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue == "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "status", value: filterValue, method: 'gte' };
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter], // whenever filter changes, react query will refetch the data
    queryFn: () => getAllBookings({ filter }),
  });
  console.log(bookings);
  return { isLoading, error, bookings };
}
