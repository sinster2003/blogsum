import { useMemo, useState } from "react";
import { BlogCard } from "../components";
import useBlogs from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import Appbar from "../components/Appbar";

const Blogs = () => {
  // page inputs state
  const [currentPage, setCurrentPage] = useState(1);

  // custom data fetch hook
  const { loading, blogs, totalPages } = useBlogs({ currentPage });

  // pagination ui
  const totalPagesArray = useMemo(() => {
    const array: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      array.push(i);
    }
    return array;
  }, [totalPages]);

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      <Appbar/>
    <div className="flex flex-col items-center w-full gap-8 mt-10 px-4 lg:mt-20 lg:px-8">
      {blogs?.map((blog) => {
        return (
          <Link to={`/blog/${blog?.id}`} className="w-full lg:w-1/2">
          <BlogCard
            key={blog?.id}
            authorName={blog?.author?.name}
            title={blog?.title}
            content={blog?.content}
            publishedDate="Feb 24, 2023"
          />
          </Link>
        );
      })}
      <div className="flex gap-2 justify-center items-center">
      {totalPagesArray.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)} className="bg-slate-300 py-3 px-4 text-md rounded-md text-slate-700 hover:bg-slate-400 hover:text-white font-semibold">{page}</button>
      ))}
      </div>
    </div>
    </div>
  );
};

export default Blogs;