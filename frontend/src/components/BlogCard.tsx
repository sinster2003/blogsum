import { Avatar } from ".";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
    <div className="flex flex-col gap-2 w-full lg:w-1/2 pb-6 border-b-2 border-slate-100">
        <div className="flex gap-2 items-center">
            <div className="flex gap-2.5 items-center">
                <Avatar authorName={authorName}/>
                <p className="text-base lg:text-lg">{authorName}</p>
            </div>
            <div className="flex gap-2 items-center">
            <p className="h-0.5 w-0.5 rounded-full bg-slate-500"></p>
            <p className="text-sm lg:text-base text-slate-500 mb-0.5">{publishedDate}</p>
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