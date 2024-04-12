import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Blog, Signin, Signup, Blogs } from "./pages";
import Publish from "./pages/Publish";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "./config";
import toast from "react-hot-toast";
import { userAtom } from "./atoms/validUserAtom";

const App = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      setUser(false);
    }
    async function validateUser() {
      try {
        const isValid: { message: string } = await axios.get(
          `${BACKEND_URL}/api/v1/user/validate`,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        if (isValid?.message === "Valid User") {
          setUser(true);
          toast.success("Welcome to Blogsum");
        }
      } catch (error) {
        setUser(false);
        toast.error("Token error: Please signin");
      }
    }
    validateUser();
  }, []);

  return (
    <BrowserRouter>
      <Toaster />
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/blog/:id"
          element={user ? <Blog /> : <Navigate to="/signin" />}
        />
        <Route
          path="/blogs"
          element={user ? <Blogs /> : <Navigate to="/signin" />}
        />
        <Route
          path="/publish"
          element={user ? <Publish /> : <Navigate to="/signin" />}
        />
      </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App;
