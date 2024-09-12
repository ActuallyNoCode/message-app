import React from "react";

export const AuthHeader = () => (
  <div className="bg-opacity-80 p-8 rounded-lg flex flex-col gap-6 max-[1000px]:hidden">
    <div className="flex flex-col gap-2">
      <span className="text-5xl font-bold">The best world</span>
      <span className="text-5xl font-bold">Chat app</span>
    </div>
    <div>
      <span className="text-black max-w-[900px] block font-semibold">
        communicate with those
      </span>
      <div className="flex gap-2 font-semibold">
        <span>who are far away</span>
      </div>
    </div>
  </div>
);
