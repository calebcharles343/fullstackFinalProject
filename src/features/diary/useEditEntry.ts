import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { editEntry as editEntryApi } from "../../services/apiDiary";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError<ErrorResponse> {}

export function useEditEntry(id: string) {
  const queryClient = useQueryClient();

  const {
    mutate: editEntry,
    isPending,
    isError,
  } = useMutation<
    AxiosResponse<any>,
    LoginError,
    { data: { title: string; content: string }; id: string }
  >({
    mutationFn: (data) => editEntryApi(data, id),

    onSuccess: (response) => {
      if (response.status === 200) {
        console.log(response.data, "❌❌❌");

        queryClient.invalidateQueries(["entries"] as any);
        // Invalidate the cache for the specific product reviews
        toast.success("Edit successful");
      } else {
        toast.error("Edit not successful");
      }
    },

    onError: (error) => {
      toast.error("Entry Error");

      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Entry Creation Error:", errorMessage);
    },
  });

  return { editEntry, isPending, isError };
}
