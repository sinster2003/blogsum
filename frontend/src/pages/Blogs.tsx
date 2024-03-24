import { useMemo, useState } from "react";
import { BlogCard } from "../components";
import useBlogs from "../hooks/useBlogs";

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
    <div className="flex flex-col items-center w-full gap-8 my-10 px-8">
      {blogs?.map((blog) => {
        return (
          <BlogCard
            key={blog?.id}
            authorName={blog?.author?.name}
            title={blog?.title}
            content={blog?.content}
            publishedDate="Feb 24, 2023"
          />
        );
      })}
      <div className="flex gap-2">
      {totalPagesArray.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>
      ))}
      </div>
    </div>
  );
};

export default Blogs;
