const Quote = (): JSX.Element => {
  return (
    <div className="bg-slate-100 h-screen shadow-md justify-center items-center hidden lg:flex">
      <div className="flex flex-col justify-center gap-5 w-9/12">
      <p className="w-fit text-3xl text-black font-bold">
        "The blogs on blogsum are top notch. An ocean of
        knowledge and inspiration brings me here again and again."
      </p>
      <div className="flex flex-col gap-0.5">
        <p className="text-black font-bold text-lg">Mitch Clamington</p>
        <p className="text-gray-500 font-semibold text-sm">Digital Content Writer | Acme.Corp</p>
      </div>
      </div>
    </div>
  );
};

export default Quote;
