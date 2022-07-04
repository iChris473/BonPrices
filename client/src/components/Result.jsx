
import { Link } from "react-router-dom";

export default function Result() {
  return (
    <div>
      {/* PRICE TITLE */}
      <Link to="/description#">
        <h1 className="text-[#a8039b] max-w-[700px] cursor-pointer hover:border-b border-[#a8039b] font-semibold text-xl md:text-2xl">
          Price of Mercedess E 400 in Palo Alto Lorem ipsum dolor sit amet.
        </h1>
      </Link>
      <div className="flexBetween">
        <div className="space-y-3 flex-1">
          {/* PRICE DESCRIPTION */}
          <p className="text-gray-500 text-sm sm:text-nd md:text-lg tracking-wide max-w-[700px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            odio qui esse voluptatum maiores cupiditate ea sapiente est
            architecto et
          </p>
          {/* PRICE COST PER UNIT */}
          <p className="font-bold text-lg text-gray-700">NGN 5,000 per unit</p>
        </div>
        <img
          src={require("../images/e400.png")}
          className="h-[60px] sm:h-[70px] md:h-[80px] rounded-lg object-contain"
          alt=""
        />
      </div>
    </div>
  );
}
