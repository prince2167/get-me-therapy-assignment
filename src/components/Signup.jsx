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
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
});

const Signup = () => {
  const { signUp, googleSignin } = useAuth();
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
      await signUp(data.email, data.password);
      navigate("/login");
    } catch (err) {
      alert(err);
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
          <h2 className="text-3xl font-bold mb-1">Create your new account</h2>
          <span className="text-[#878787] text-sm">
            Create an account to start looking for the food you like
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
          <div className="mb-3">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FE8C00]"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
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
          <div className="mb-4 flex items-center">
            <input
              id="terms"
              type="checkbox"
              {...register("terms")}
              className="h-4 w-4 border-gray-300 text-[#FE8C00] focus:ring-blue-500 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm">
              I agree to the{" "}
              <a href="#" className="text-[#FE8C00] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#FE8C00] hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mb-2">{errors.terms.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#FE8C00] text-white py-2 px-4  hover:bg-[#FE8C00] transition duration-200 rounded-[100px]"
          >
            Register
          </button>
        </form>

        <div className="text-sm text-[#878787] text-center my-4">
          Or sign in with
        </div>

        <button onClick={googleSigninHandler}>
          <img src={google} alt="google" />
        </button>
        <p className="text-center text-sm mt-4 font-semibold">
          Have an account?{" "}
          <a href="/login" className="text-[#FE8C00]">
            Sign In
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Signup;
