import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { createEntry as createEntryApi } from "../../services/apiDiary";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError<ErrorResponse> {}

export function useCreateEntry() {
  const queryClient = useQueryClient();

  const {
    mutate: createEntry,
    isPending,
    isError,
  } = useMutation<
    AxiosResponse<any>,
    LoginError,
    { title: string; content: string }
  >({
    mutationFn: (data) => createEntryApi(data),

    onSuccess: (response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries(["entries"] as any);
        // Invalidate the cache for the specific product reviews
        toast.success("Entry successful");
      } else {
        toast.error("Entry not successful");
      }
    },

    onError: (error) => {
      toast.error("Entry Error");

      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Entry Creation Error:", errorMessage);
    },
  });

  return { createEntry, isPending, isError };
}
