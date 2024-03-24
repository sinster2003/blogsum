
const Avatar = ({ authorName } : { authorName: string; }) => {
  const splitName = authorName?.split(" ");
  return (
    <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-gray-600 rounded-full">
      <span className="text-xs lg:text-lg font-medium text-slate-100">{`${splitName[0][0]} ${splitName?.includes(" ") && splitName[1][0]}`}</span>
    </div>
  );
};

export default Avatar;
