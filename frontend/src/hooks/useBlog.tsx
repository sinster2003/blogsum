import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { Blog } from "./useBlogs";

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
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  return {
    loading,
    blog,
  }
}

export default useBlog