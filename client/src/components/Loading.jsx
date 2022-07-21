

export default function Loading() {
  return (
    <div className="w-full space-y-5 flex flex-col mx-auto max-w-[1000px]">
      <div className="w-[20%] h-[30px] rounded-lg animate-pulse bg-gray-200"></div>
      <div className="w-[90%] h-[200px] rounded-lg animate-pulse bg-gray-200"></div>
      <div className="w-[20%] h-[30px] rounded-lg animate-pulse bg-gray-200"></div>
      <div className="w-[90%] h-[200px] rounded-lg animate-pulse bg-gray-200"></div>
      <div className="w-[20%] h-[30px] rounded-lg animate-pulse bg-gray-200"></div>
      <div className="w-[90%] h-[200px] rounded-lg animate-pulse bg-gray-200"></div>
    </div>
  );
}
