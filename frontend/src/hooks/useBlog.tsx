import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { Blog } from "./useBlogs";
import toast from "react-hot-toast";

const useBlog = ({ id } : { id: string | undefined}) => {
  const [loading, setLoading ] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    if(id) {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlog(response?.data?.blog);
            setLoading(false);
            toast.success("Enjoy your read");
        })
        .catch(error => {
          console.log(error)
          toast.error("Something went wrong. Try to refresh the page. Else signin again")
        });
    }
  }, [id]);

  return {
    loading,
    blog,
  }
}

export default useBlog