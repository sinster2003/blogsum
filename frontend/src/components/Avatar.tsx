
const Avatar = ({ authorName, size } : { authorName: string | undefined; size?: string}) => {
  const splitName = authorName?.split(" ");

  return (
    <div className={`flex items-center justify-center bg-gray-600 rounded-full ${size === "small" ? 'h-6 w-6 lg:h-8 lg:w-8': 'h-8 w-8 lg:h-10 lg:w-10'}`}>
      <span className="text-xs lg:text-lg font-medium text-slate-100">{`${ (splitName as string[])[0][0]}${splitName?.includes(" ") ? " " + splitName[1][0]: ""}`}</span>
    </div>
  );
};

export default Avatar;