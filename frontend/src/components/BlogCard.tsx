import { Avatar } from ".";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
    <div className="flex flex-col gap-2 p-4 lg:p-6 border-b-2 border-slate-100 shadow-lg">
        <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
                <Avatar authorName={authorName.toUpperCase()} size={"small"}/>
                <p className="text-base lg:text-lg mb-0.5">{authorName}</p>
            </div>
            <div className="flex gap-2 items-center">
            <p className="h-0.5 w-0.5 lg:h-1 lg:w-1 rounded-full bg-slate-500"></p>
            <p className="text-sm lg:text-base text-slate-500">{publishedDate}</p>
            </div>
        </div>
        <div className="flex flex-col gap-1.5">
            <p className="text-xl lg:text-2xl text-black font-bold">{title}</p>
            <p className="text-base lg:text-lg text-slate-700 font-para">{content?.length > 100 ? `${content?.slice(0, 100)}...` : content}</p>
        </div>
        <div className="text-slate-500 mt-1 lg:mt-2 text-sm lg:text-base">
            {Math.ceil(content?.split(" ")?.length / 200)} min(s) read
        </div>
    </div>
  )
}



export default BlogCard