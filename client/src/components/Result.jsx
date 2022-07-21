
import { Link } from "react-router-dom";

export default function Result({data}) {
  return (
    <div className="w-full mx-auto max-w-[1000px]">
      {/* PRICE TITLE */}
        <h1 className="text-[#a8039b] w-fit cursor-pointer hover:underline decoration-[#a8039b] font-semibold text-xl md:text-2xl">
          <Link to={`/description#?id=${data._id}`}>{data.title}</Link>
        </h1>
      <div className="flexBetween">
        <div className="space-y-3 flex-1">
          {/* PRICE DESCRIPTION */}
          <p className="text-gray-500 text-sm sm:text-nd md:text-lg tracking-wide max-w-[700px]">
          {data.description}
          </p>
          {/* PRICE COST PER UNIT */}
          <p className="font-bold text-lg text-gray-700">NGN {parseFloat(data?.price).toLocaleString()} per {data.unit}</p>
        </div>
        <img
          src={data.picture[0]}
          className="h-[60px] sm:h-[70px] md:h-[80px] rounded-lg object-contain"
          alt=""
        />
      </div>
    </div>
  );
}
