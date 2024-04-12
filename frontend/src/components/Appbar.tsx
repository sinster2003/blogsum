import { Link, useLocation, useNavigate} from "react-router-dom";
import { Avatar } from ".";
import { useState } from "react";

const Appbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-5 shadow-lg">
      <Link to="/blogs">
        <div className="text-extrabold text-black text-2xl">BlogSum</div>
      </Link>
      <ul className="flex gap-4 items-center">
        {!location.pathname.includes("publish") && (
          <Link to="/publish">
            <li>
              <button className="p-2 px-8 rounded-full bg-green-500 hover:bg-green-600 hover:text-white">
                Publish
              </button>
            </li>
          </Link>
        )}
        <li>
          <div onClick={() => setOpen(!open)} className="cursor-pointer">
            <Avatar authorName={"Alpha"} />
          </div>
        </li>
      </ul>
        <div className={`absolute top-0 right-0 w-full md:w-1/4 h-screen bg-black text-white ${!open ? "translate-x-full" : "-translate-x-0"} transition duration-1000`}>
          <div className="absolute left-3 top-3 text-white font-bold cursor-pointer" onClick={() => setOpen(false)}>X</div>
          <ul className="flex flex-col mt-20 gap-5 items-center justify-center w-full">
            <li>My Blogs</li>
            <li className="cursor-pointer" onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}>Logout</li>
          </ul>
        </div>
    </div>
  );
};

export default Appbar;
