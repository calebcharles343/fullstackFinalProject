import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      if (data.status === "success") {
        const userData = data.data.user;

        console.log(userData);

        // Clear React Query cache
        queryClient.clear();

        // Set JWT token in cookies
        Cookies.set("jwt", data.data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        // Set user data in React Query cache
        queryClient.setQueryData(["user", userData.id], userData);
        localStorage.setItem("localUser", JSON.stringify(data.data.user));

        localStorage.setItem(`token-${userData.id}`, data.token);
        // Redirect to the home page
        navigate("/home", { replace: true });
      } else {
        toast.error("Provided email or password are incorrect");
        console.error("Login Error:", data.message);
      }
    },
    onError: (err) => {
      toast.error("Network or server error");
      console.log("ERROR", err);
    },
  });

  return { login, isPending };
}
