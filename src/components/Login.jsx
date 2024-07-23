import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import google from "../assets/google.svg";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const { login, googleSignin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const googleSigninHandler = async (event) => {
    event.preventDefault();
    try {
      await googleSignin();

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-[375px] text-[#101010]">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-1">Login to your account.</h2>
          <span className="text-[#878787] text-sm">
            Please sign in to your account{" "}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FE8C00]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-3 relative">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FE8C00]"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 top-6 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEye size={24} />
              ) : (
                <AiFillEyeInvisible size={24} />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center justify-end">
            <label className="ml-2 text-sm">
              <a href="#" className="text-[#FE8C00] hover:underline">
                Forgot Password?
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FE8C00] text-white py-2 px-4 hover:bg-[#d07300] transition duration-200 rounded-full"
          >
            Log In
          </button>
        </form>

        <div className="text-sm text-[#878787] text-center my-4">
          Or log in with
        </div>

        <button onClick={googleSigninHandler}>
          <img src={google} alt="Log in with Google" />
        </button>
        <p className="text-center text-sm mt-4 font-semibold">
          Don&apos;t have an account?{" "}
          <a href="/Signup" className="text-[#FE8C00]">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
