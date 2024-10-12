import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useUser() {
  const { data: user, error } = useSWR("/user", fetcher, { suspense: true });

  return {
    user,
    isLoading: !user && !error,
    isError: error,
  };
}
