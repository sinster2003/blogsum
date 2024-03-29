import { useParams } from "react-router-dom"
import useBlog from "../hooks/useBlog";
import { Avatar } from "../components";
import Appbar from "../components/Appbar";

const Blog = (): JSX.Element => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id });

  if(loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <Appbar/>
    <div className="flex flex-col items-center p-10 sm:px-20 gap-10 md:grid md:grid-cols-12 md:p-20 md:px-30 lg:p-20 lg:px-40 md:items-start md:gap-0">
      <div className="flex flex-col gap-3 sm:gap-5 col-span-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4.5xl sm:text-5xl font-bold w-full text-center sm:text-start">{blog?.title}</h1>
        <p className="text-gray-500">Post on December 23, 2023</p>
      </div>
      <p className="font-para text-lg text-slate-700">{blog?.content}</p>
      </div>
      <div className="flex flex-col gap-2 pt-5 col-span-4 self-end">
        <p className="text-slate-700">Author</p>
        <div className="flex gap-4 items-center">
          <div>
            <Avatar authorName={blog?.author.name} size={"small"}/>
          </div>
          <div className="flex flex-col">
          <p className="text-slate-700 text-2xl font-bold">{blog?.author?.name}</p>
          <p className="text-slate-900 text-base font-light">Writer at BlogSum</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Blog