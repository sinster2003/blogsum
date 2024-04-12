
const BlogsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-4 lg:p-6 justify-center">
      <div className="flex gap-2 items-center h-3 mb-2">
        <div className="flex gap-2.5 items-center">
          <div className={`animate-pulse flex items-center justify-center bg-gray-600 rounded-full h-6 w-6 lg:h-8 lg:w-8`}>
        </div>
          <div className="animate-pulse h-3 w-20 bg-slate-300 rounded-full"></div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="animate-pulse h-0.5 w-0.5 lg:h-1 lg:w-1 rounded-full bg-slate-500"></p>
          <p className="animate-pulse h-3 w-20 bg-slate-300 rounded-full"></p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="animate-pulse h-5 w-96 bg-slate-300 rounded-full"></div>
        <div className="animate-pulse h-5 w-1/2 bg-slate-300 rounded-full mb-0.5"></div>
      </div>
      <div className="animate-pulse bg-slate-300 mt-1 lg:mt-2 rounded-full w-20 h-3"></div>
    </div>
  );
};

export default BlogsSkeleton;
