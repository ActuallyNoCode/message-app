import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-white h-14 flex items-center justify-between border-b border-gray-200 px-4">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full hover:scale-110">
          <Image
            src="/profile/27.svg"
            alt="Profile Picture"
            width={70}
            height={70}
            className="rounded-full h-10 w-10"
          />
        </div>
        <div className="ml-4">
          <span className="text-black text-sm md:text-base">Brayan Suarez</span>
          <span className="block text-gray-400 text-xs md:text-sm">2 min</span>
        </div>
      </div>
    </div>
  );
}
