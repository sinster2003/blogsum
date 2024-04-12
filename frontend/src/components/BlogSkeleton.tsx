
const BlogSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-10 sm:px-20 gap-10 md:grid md:grid-cols-12 md:p-20 md:px-30 lg:p-20 lg:px-40 md:items-start md:gap-0">
      <div className="flex flex-col gap-3 sm:gap-5 md:col-span-8">
      <div className="flex flex-col gap-3">
      <div className="animate-pulse h-5 w-1/2 bg-slate-300 rounded-full"></div>
        <div className="animate-pulse h-5 w-1/3 bg-slate-300 rounded-full"></div>
      </div>
      <div className="animate-pulse h-5 w-2/3 bg-slate-300 rounded-full mb-0.5"></div>
      </div>
      <div className="flex flex-col gap-2 pt-5 md:col-span-4 self-end">
      <div className="animate-pulse bg-slate-300 mt-1 lg:mt-2 rounded-full w-10 h-3"></div>
        <div className="flex gap-4 items-center">
        <div className="flex gap-2.5 items-center">
          <div className={`animate-pulse flex items-center justify-center bg-gray-500 rounded-full h-6 w-6 lg:h-8 lg:w-8`}>
        </div>
          <div className="flex flex-col">
            <div className="animate-pulse bg-slate-300 mt-1 lg:mt-2 rounded-full w-20 h-3"></div>
            <div className="animate-pulse bg-slate-300 mt-1 lg:mt-2 rounded-full w-20 h-3"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BlogSkeleton