import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog {
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
    })
    .catch(error => console.log(error));
  }, [currentPage]);

  return {
    loading,
    blogs,
    totalPages
  }
}

export default useBlogs