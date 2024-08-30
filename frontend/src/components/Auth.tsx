import { Link, useNavigate } from "react-router-dom";
import { InputBox } from ".";
import { useState } from "react";
import axios from "axios";
import { signinTypes, signupTypes } from "@sinster2003/blogsum-zod-types";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/validUserAtom";

const Auth = ({ type }: { type: string }): JSX.Element => {
  const initialState: signupTypes | signinTypes = {
    email: "",
    password: "",
    ...(type === "signup" && { name: "", username: "" }) // spread name & username for signup
  }

  const [postInputs, setPostInputs] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleRequest = async () => {
    try {
      setLoading(true);
      // signup or signin
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${
          type === "signup" ? "signup" : "signin"
        }`,
        postInputs
      );

      const result = await response.data;
      
      // set token in localStorage
      localStorage.setItem("token", `Bearer ${result.jwt}`);
      setLoading(false);
      setPostInputs(initialState);
      toast.success("Welcome to blogsum");
      setUser(true);
      navigate("/blogs");
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-6">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {type === "signup" ? "Create an account" : "Welcome to blogsum"}
        </h1>
        <p className="text-base sm:text-lg text-gray-500">
          {type === "signup"
            ? "Already have an account?"
            : "Do not have an account?"}{" "}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="underline"
          >
            {type === "signup" ? "Login" : "Signup"}
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-5 w-9/12 md:w-6/12">
        {/* type assertion */}
        {type === "signup" && (
          <InputBox
            label="Name"
            value={(postInputs as signupTypes)?.name}
            placeholder="Enter Your Name"
            onChange={(e) => {
              setPostInputs((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
        )}
        {type === "signup" && (
          <InputBox
            label="Username"
            value={(postInputs as signupTypes)?.username}
            placeholder="Enter Your Username"
            onChange={(e) => {
              setPostInputs((prevState) => ({
                ...prevState,
                username: e.target.value,
              }));
            }}
          />
        )}
        <InputBox
          label="Email"
          value={postInputs?.email}
          placeholder="Enter Your Email"
          onChange={(e) => {
            setPostInputs((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
        />
        <InputBox
          label="Password"
          type="password"
          value={postInputs?.password}
          placeholder="Enter Your Password"
          onChange={(e) => {
            setPostInputs((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
        />
        <button
          onClick={handleRequest}
          disabled={loading ? true : false}
          className="flex justify-center items-center my-2 bg-black text-white w-full rounded-md py-2 hover:bg-opacity-90 disabled:cursor-not-allowed"
        >
          {!loading && (type === "signup" ? "Sign up" : "Sign in")}
          {loading && <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 text-white animate-spin my-1"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>}
        </button>
      </div>
    </div>
  );
};

export default Auth;
