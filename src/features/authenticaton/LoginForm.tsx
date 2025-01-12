// Assuming this component exists

import { FormEvent, useState } from "react";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
// import tungaLogo from "../../data/tunga_logo_round.webp";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login, isPending: isLoading } = useLogin();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-rose-600 to-gray-950 f overflow-y-scroll 
      font-roboto tracking-wide  text-white pt-16"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div
        className="scale-75 md:scale-90 mb-1 md:mb-2 flex items-center  
      bg-rose-800 opacity-90 text-white rounded-full p-2 gap-2 border-4 "
      >
        <a href="">
          <div
            className="flex items-center justify-center h-11 w-11 border-2 
          p-2 bg-[#DC3340] text-white rounded-full"
          >
            <span className="text-[8px] font-extrabold">TUNGA</span>
          </div>
        </a>

        <h1
          className=" md:text-lg font-extrabold text-white "
          style={{ fontFamily: "Poppins", letterSpacing: "0.8px" }}
        >
          DEVELOPER DIARY
        </h1>
      </div>
      <div className="w-full md:w-[400px] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 
          lg:gap-10 w-full max-w-md bg-white bg-opacity-90 p-4 md:p-6 rounded-md 
          shadow-xl backdrop-blur-lg  mx-4 md:mx-0"
        >
          <div className="flex flex-col w-full gap-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-bold text-gray-700"
              >
                Email
              </label>
              <input
                className="w-full h-8 md:h-10 px-4 rounded-md border 
                focus:border-[#B97743] focus:outline-none shadow-sm 
                text-gray-700"
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-bold text-gray-700"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  className="w-full h-8 md:h-10 px-4 rounded-md border 
                  focus:border-[#B97743] focus:outline-none shadow-sm 
                  text-gray-700"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                  cursor-pointer"
                  onClick={handleShowPassword}
                >
                  <ShowPasswordIcon showPassword={showPassword} />
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-8 md:h-10 flex justify-center items-center 
            bg-gray-800 text-white rounded-md shadow-md"
            disabled={isLoading}
          >
            {isLoading ? <SpinnerMini /> : "Login"}
          </button>
        </form>
      </div>

      <p className="text-gray-50 text-center mt-8 ">
        &copy; 2025 Tunga <span className="md:hidden">Dev</span>{" "}
        <span className="hidden md:inline">Developer</span> Diary. All rights
        reserved.
      </p>
    </div>
  );
};

export default LoginForm;
