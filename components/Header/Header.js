import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { 
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const Header = ({placeholder, location}) => {

  const [ searchInput, setSearchInput ] = useState("");
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ guests, setGuests ] = useState(1);

  const router = useRouter();

  const selectionRange = {
    startDate,
    endDate,
    key: "selection"
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const resetInput = () => {
    setSearchInput("");
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests
      }
    })
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div 
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
        <Image
          src="https://links.papareact.com/qd3"
          alt="Airbnb Logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          type="text"
          placeholder={placeholder || "Start your search"}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
        />
        <SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2" />        
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <span className="hidden md:inline">
          Become a host
        </span>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {searchInput && searchInput !== "" && location !== searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl pl-2 flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>

          <div className="flex ">
            <button 
              className="flex-grow text-gray-500" 
              onClick={resetInput}
            >
              Cancel
            </button>
            <button 
              className="flex-grow text-red-400"
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      )}

    </header>
  )
}