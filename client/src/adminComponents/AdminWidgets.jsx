import {
  CollectionIcon,
  CursorClickIcon,
  FolderAddIcon,
  SwitchHorizontalIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function AdminWidgets() {
  return (
    <div className="flexCenter flex-col gap-5 w-full">
      {/* TOTAL FIELDS */}
      <div className="flexBetween shadow-lg rounded-md px-5 py-10 border border-pink-200  w-[95%] bg-gray-100 max-w-[700px] mx-auto">
        <div className="space-y-5">
          <h1 className="tracking-wide russo font-semibold text-xl text-gray-500">
            TOTAL FIELDS
          </h1>
          <p className="font-extrabold text-5xl text-pink-800">50</p>
        </div>
        <CollectionIcon className="h-20 text-gray-300" />
      </div>
      {/* VIEW ALL FIELDS */}
      <div className="flexBetween shadow-lg rounded-md px-5 py-10 border border-pink-200  w-[95%] bg-gray-100 max-w-[700px] mx-auto">
        <Link to="/admin/myfields">
          <div className="space-y-5">
            <h1 className="tracking-wide russo font-semibold text-xl text-gray-500">
              VIEW ALL FIELDS
            </h1>
            <ViewGridAddIcon className="font-extrabold h-14 text-pink-800" />
          </div>
        </Link>
        <SwitchHorizontalIcon className="h-20 text-gray-300" />
      </div>
      {/* ADD NEW FIELD */}
      <div className="flexBetween shadow-lg rounded-md px-5 py-10 border border-pink-200  w-[95%] bg-gray-100 max-w-[700px] mx-auto">
        <Link to="/admin/newfield">
          <div className="space-y-5">
            <h1 className="tracking-wide russo font-semibold text-xl text-gray-500">
              ADD NEW FIELD
            </h1>
            <CursorClickIcon className="font-extrabold h-14 text-pink-800 rotate-90" />
          </div>
        </Link>
        <FolderAddIcon className="h-20 text-gray-300" />
      </div>
    </div>
  );
}
