import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteEntry as deleteEntryApi } from "../../services/apiDiary";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteEntry() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteEntry,
    isPending: isDeleting,
    isError: isErrorDeleting,
    error: errorDeleting,
  } = useMutation<void, FetchError, string>({
    mutationFn: (Id: string) => deleteEntryApi(Id),
    onSuccess: () => {
      toast.success("Entry deleted");

      queryClient.invalidateQueries([`entries`] as any);
    },
    onError: (error) => {
      toast.error("Error deleting ");

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while deleting the product.";
      console.error("Delete product Error:", errorMessage);
    },
  });

  return {
    deleteEntry,
    isDeleting,
    isErrorDeleting,
    errorDeleting,
  };
}
