import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ onSearch }) {
  return (
    <>
      <div className="bar bg-branco-100 text-preto-100 rounded-full">
        <label className="flex justify-between p-1.5">
          <input
            type="text"
            placeholder="Pesquise pelo título, autor..."
            className="w-full pr-3 pl-3 outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
          <div className="pr-2 pl-2">
            <IoSearchOutline className="h-full" />
          </div>
        </label>
      </div>
    </>
  );
}
