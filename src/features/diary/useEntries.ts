import { useQuery } from "@tanstack/react-query";
import { entries } from "../../services/apiDiary";

export function useEntries() {
  return useQuery<any, Error>({
    queryKey: ["entries"],
    queryFn: entries,
    staleTime: 0,
  });
}
