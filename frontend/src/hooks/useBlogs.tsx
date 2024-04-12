import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string
    }
}

const useBlogs = ({ currentPage } : { currentPage: number; }) => {
  const [loading, setLoading ] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk?currentPage=${currentPage}&itemsPerPage=5`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
    })
    .then(response => {
        setBlogs(response?.data?.blogs);
        setTotalPages(response?.data?.totalPages)
        setLoading(false);
        toast.success("Blogs gathered successfully");
    })
    .catch(error => {
      console.log(error);
      toast.error("Something went wrong. Try to refresh the page. Else signin again")
    });
  }, [currentPage]);

  return {
    loading,
    blogs,
    totalPages
  }
}

export default useBlogs